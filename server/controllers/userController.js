
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

export async function register(req, res) {
  const { email, password } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido" });
  }

  try {
    const existing = await pool.query("SELECT email FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.json({ emailExist: true });
    }

    const insertResult = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    const userId = result.rows[0].id
    const token = jwt.sign({id:userId }, process.env.SECRET, { expiresIn: 300 });
    return res.status(201).json({ message: "Usuário criado com sucesso!", token, redirectUrl: "/login/dashboard" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno", detail: (err).message });
  }
}

export async function listUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários", detail: (err).message });
  }
}
