const express = require("express");
var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
con.connect();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  con.query("SELECT * FROM users", (err, result) => {
    res.send(result);
  });
});

app.post("/add_user", async (req, res) => {
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const email = req.body.email;
  const password = req.body.password;
  if (emailRegex.test(email)) {
    con.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
      const validateEmail = result[0];
      if (validateEmail === undefined) {
        con.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [
          email,
          password,
        ]);
        return res.json("false");
      } else return res.json("true");
    });
  }
});

app.post("/login", cors(corsOptions), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    con.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
      con.query(
        `SELECT * FROM users WHERE password = ?`,
        [password],
        (err1, result1) => {
          if (result[0] === undefined || result1[0] === undefined) {
            console.log("nao deu certo");
            return res.status(401).json ({
                success:false,
                message: 'Credenciais inválidas'
              })
          } else
            res.cookie("teste", "teste", {
              maxAge: 2000 * 60,
              domain: "localhost",
              httpOnly: true,
              secure: true,
              sameSite: "None"
            });
          return res.status(200).json ({
            success:true,
            message: 'Login bem-sucedido',
          })
        }
      );
    });
});

function autorizeCookie(req, res, next) {
  const authorizedCookie = req.cookies["teste"];
  if (authorizedCookie === "teste") {
    return next();
  } else {
    console.log("Cookie não autorizado:", req.cookies);
    return res.status(403).send("Forbidden: Unauthorized cookie");
  }
}

app.get("/validate", autorizeCookie, (req, res) => {
  var cookie = req.headers.cookie;
  console.log("Cookies recebidos:", cookie);
  return res.json({ cookies: cookie });
});

app.listen(8081);
