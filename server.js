const express = require('express')
var mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
con.connect()
var app = express();
app.use(express.json())
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    con.query("SELECT * FROM users", (err, result) => {
        res.send(result);
    })
})

app.post('/add_user', async (req, res) => {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    const email = req.body.email
    const password = req.body.password
    if (emailRegex.test(email)) {
        con.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
            const validateEmail = result[0]
            if (validateEmail === undefined) {
                con.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password])
                return res.json("false")
           }
            else return res.json("true")
        })
    }
})

app.listen(8081);