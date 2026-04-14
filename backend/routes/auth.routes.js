import express from "express";
import { sendOtp, verifyOtp, completeProfile } from "../controllers/auth.controller.js";
import { verifyTempToken } from "../middleware/tempmiddleware.js";
const router = express.Router();
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-profile", verifyTempToken, completeProfile);
export default router;