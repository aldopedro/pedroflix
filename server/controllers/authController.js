
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
      const user = result.rows[0]
    const token = jwt.sign({ id:user.id }, process.env.SECRET, { expiresIn: 300 });
    res.status(200).json({ token, auth: true, success: true, message: "Autenticado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar", detail: (err).message });
  }
}

export function refresh(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Token expirado ou inválido" });

    const newAccessToken = jwt.sign({ id: payload.id }, process.env.SECRET, { expiresIn: 300 });
    res.json({ accessToken: newAccessToken });
  });
}

export async function getProfiles(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM profiles WHERE user_id = $1",
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar perfis:", err);
    res.status(500).json({ message: "Erro ao buscar perfis", detail: err.message });
  }
}


export async function createProfiles (req, res) {
  const userId = req.user.id
  const {name, avatar, isKids} = req.body

  try {
    const result = await pool.query("INSERT INTO profiles (user_id, name, avatar_url, is_kids) VALUES ($1, $2, $3, $4) RETURNING *", [userId, name, avatar, isKids]);
    res.status(201).json(result.rows[0])
  } catch (err) {
      res.status(500).json({ message: "Erro ao criar perfil", detail: err.message });
  }
}

export function validate(req, res) {
  res.status(200).json({ message: "Token válido", id: (req.user).id });
}
