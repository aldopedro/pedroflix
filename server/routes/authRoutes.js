import { Router } from "express";
import { login, refresh, validate, getProfiles, createProfiles, getPopularMoviesWithTrailer} from "../controllers/authController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/validate", verifyJWT, validate);
router.get("/getProfiles", verifyJWT, getProfiles)
router.get("/popular", getPopularMoviesWithTrailer);
router.post("/createProfiles", verifyJWT, createProfiles)
router.post("/logout", (_, res) => res.status(200).json({ message: "Logout realizado com sucesso!" }));

export default router;
