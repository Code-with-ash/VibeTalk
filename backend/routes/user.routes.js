import express from "express";
import prisma from "../config/db.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Get current user
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;