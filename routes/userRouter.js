import express from "express";
import { login, register, logout,myProfile } from "../controller/userController.js";
import { isAuthenticated } from "../midddlewares/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

router.get("/me",isAuthenticated, myProfile);

export default router;
