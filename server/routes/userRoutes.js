import { Router } from "express";
import { register, listUsers } from "../controllers/userController.js";

const router = Router();

router.get("/", listUsers);
router.post("/add_user", register);

export default router;
