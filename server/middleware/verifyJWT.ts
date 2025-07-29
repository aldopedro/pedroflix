import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
}
