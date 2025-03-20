const express = require("express");
var mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");


const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const con = mysql.createConnection(urlDB)

con.connect();
app.use(express.json());
const corsOptions = {
  origin: "https://pedroflix-five.vercel.app",
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
      if (err) {
        return res.status(500).json({ error: 'Erro na consulta ao banco de dados' });
      }
      const validateEmail = result[0];
      if (validateEmail === undefined) {
        con.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], (insertErr) => {
          if (insertErr) {
            return res.status(500).json({ error: 'Erro ao inserir o usuário' });
          }
          return res.json({ emailExists: false });
        });
      } else {
        return res.json({ emailExists: true });
      }
    });
  } else {
    return res.status(400).json({ error: 'Email inválido' });
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
            return res.status(401).json ({
                success:false,
                message: 'Credenciais inválidas'
              })
            } else {
              const token = jwt.sign({name: email}, process.env.SECRET, {expiresIn: 300 });
              res.cookie('jwt_token', token, {
                httpOnly: true,
                maxAge: 300 * 1000,
                sameSite: "None"
              })
              
              return res.send(200).json({auth:true, sucess:true, message:"Autenticado com sucesso!"})
            }
          })
      })});

function verifyJWT (req, res, next) {
  const token = req.headers['x-acess-token']
  jwt.verify(token,process.env.SECRET, (err, decoded)=> {
    if(err) return res.status(401).end();

    req.body.email = decoded.body.email;
    next();
  })
}



app.get('/validate', verifyJWT, (req, res) => {
  const token = req.cookies['jwt_token']

  if(!token) {
    return res.status(401).json({message: 'Ausência de Token'});
  }
  jwt.verify(token, process.env.SECRET, (err,decoded => {
    if(err) return res.status(401).json({message: 'Token inválido'});

    req.body.email = decoded.body.email
    next();
  }))
})

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});