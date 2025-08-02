import { Router } from "express";
import { login, refresh, validate } from "../controllers/authController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/validate", verifyJWT, validate);
router.get("/profiles", verifyJWT, getProfiles)
router.post("/profiles", verifyJWT, createProfiles)
router.post("/logout", (_, res) => res.status(200).json({ message: "Logout realizado com sucesso!" }));

export default router;
