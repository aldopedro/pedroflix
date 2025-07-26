const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));


dotenv.config();
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const corsOptions = {
  origin:
  process.env.NODE_ENV === "production"
  ? "https://pedroflix-five.vercel.app"
  : "http://localhost:3000",
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Rota GET usuários
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários", detail: err });
  }
});

// Rota POST para adicionar usuário
app.post("/add_user", cors(corsOptions), async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido" });
  }

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.json({ emailExist: true });
    }
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 300 });
    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
  maxAge: 300 * 1000,
});
    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      token: token,
      redirectUrl: "/login/dashboard",
    });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ error: "Erro interno", detail: err.message });
  }
});

// Rota de login
app.post("/login", cors(corsOptions), async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 300 });

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
  maxAge: 300 * 1000,
});

    return res.status(200).json({
      token,
      auth: true,
      success: true,
      message: "Autenticado com sucesso!",
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar", detail: err.message });
  }
});

// Middleware JWT
function verifyJWT(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    req.body.email = decoded.email;
    next();
  });
}

// Rota refresh
app.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Sem token de refresh" });

  jwt.verify(token, process.env.REFRESH_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Refresh token inválido ou expirado" });

    const newAccessToken = jwt.sign(
      { email: payload.email },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
});

// Validação do token
app.get("/validate", verifyJWT, (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Ausência de Token" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    res.status(200).json({ message: "Token válido", email: decoded.email });
  });
});

// Logout
app.post("/logout", cors(corsOptions), (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1000 * 60 * 60,
  });
  res.status(200).json({ message: "Logout realizado com sucesso!" });
});

// Start do servidor
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
