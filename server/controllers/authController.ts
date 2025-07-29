import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db/pool";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ email }, process.env.SECRET as string, { expiresIn: 300 });
    res.status(200).json({ token, auth: true, success: true, message: "Autenticado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar", detail: (err as Error).message });
  }
}

export function refresh(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET as string, (err, payload: any) => {
    if (err) return res.status(403).json({ message: "Token expirado ou inválido" });

    const newAccessToken = jwt.sign({ email: payload.email }, process.env.SECRET as string, { expiresIn: 300 });
    res.json({ accessToken: newAccessToken });
  });
}

export function validate(req: Request, res: Response) {
  res.status(200).json({ message: "Token válido", email: (req.user as any).email });
}
