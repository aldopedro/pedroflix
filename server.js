const express = require("express");
var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


const urlDB = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.MYSQL_DATABASE}`

const con = mysql.createConnection(urlDB)

con.connect();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "*",
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
  console.log(json.parse(email))
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
module.exports = con