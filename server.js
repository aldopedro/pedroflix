const express = require("express");
var mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
})

con.connect();
app.use(express.json());
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "https://pedroflix-five.vercel.app/" : "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.get("/", (req, res) => {
  con.query("SELECT * FROM users", (err, result) => {
    res.send(result);
  });
});

app.post("/add_user", cors(corsOptions), async (req, res) => {
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const email = req.body.email;
  const password = req.body.password;
  if (emailRegex.test(email)) {
    con.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
      const validateEmail = result[0];
      if (validateEmail === undefined) {
        con.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password])
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
          });
    
          if (!response.ok) {
            return res.status(500).json({ message: 'Falha ao gerar o token de login.' });
          }
    
          const data = await response.json();
          res.cookie('token', data.token, {
            maxAge: 300 * 1000,
              path: '/',
          })
          return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            token: data.token,
            redirectUrl: '/login/dashboard',
          });
    
        } catch (error) {
          console.error('Erro ao chamar o serviço de login:', error);

          return res.status(500).json({
            message: 'Erro ao fazer login.',
            error: error.message,
          });
        }
      } else {
      return res.json({
        emailExist: true
      });
    }})
}})

app.post("/login", cors(corsOptions), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(password)
  console.log(email)
  con.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, result) => {
            if (result[0] === undefined) {
            return res.status(401).json ({
                success:false,
                message: 'Credenciais inválidas'
              })
            } else {
              const token = jwt.sign({email: email}, process.env.SECRET, {expiresIn: 300 });
              res.cookie('token', token, {
                maxAge: 300 * 1000,
                path: '/',
              })
              return res.status(200).json({token, auth:true, sucess:true, message:"Autenticado com sucesso!"})
            }
          })
      });

function verifyJWT (req, res, next) {
  const token = req.cookies.token
  jwt.verify(token,process.env.SECRET, (err, decoded)=> {
    if(err) return res.status(401).end();

    req.body.email = decoded.email;
    next();
  })
}

app.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'Sem token de refresh' });

  jwt.verify(token, REFRESH_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Refresh token inválido ou expirado' });

    const newAccessToken = jwt.sign({ email: payload.email }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});

app.get('/validate', verifyJWT, (req, res) => {

  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: 'Ausência de Token' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.body.email = decoded.email;
    res.status(200).json({ message: 'Token válido', email: req.body.email });
  });
});
app.post("/logout", cors(corsOptions), (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 1000 * 60 * 60,
  });
  res.status(200).json({ message: "Logout realizado com sucesso!" });
});

const port = 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});