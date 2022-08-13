import express from "express";
import { googleAuth, signin, signup } from "../manager/auth.js";

const router = express.Router();

//new user
router.post("/signup", signup)
//sign in
router.post("/signin", signin)
//google auth
router.post("/google", googleAuth)

export default router;