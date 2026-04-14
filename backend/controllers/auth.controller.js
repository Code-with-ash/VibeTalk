import express from 'express';
import { sendOtpEmail } from "../services/otp.service.js";
import prisma from '../config/db.js'
import jwt from "jsonwebtoken";
const router = express.Router();
export const sendOtp = async (req, res) => {
    const { phonenumber, email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Please provide email" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        // ✅ First save OTP
        await prisma.otp.create({
            data: {
                email,
                otp: otp.toString(),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            }
        });

        // ✅ Then send email
        await sendOtpEmail(email, otp);

        // ✅ Then send response (ONLY ONCE)
        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const record = await prisma.otp.findFirst({
            where: {
                email,
                otp: String(otp)
            },
            orderBy: { createdAt: "desc" }
        });

        if (!record) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (record.expiresAt < new Date()) {
            await prisma.otp.delete({ where: { id: record.id } }); // cleanup expired
            return res.status(400).json({ message: "OTP expired" });
        }

        await prisma.otp.delete({ where: { id: record.id } });

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            const token = jwt.sign(
                { id: user.id, email: user.email },  // ← include email in payload
                process.env.JWT_SECRET,
                { expiresIn: "7d" }                  // ← 1h is too short, use 7d
            );
            return res.status(200).json({
                message: "Login successful",
                isNewUser: false,
                user,
                token
            });
        }

        // for new users:
        return res.status(200).json({
            message: "New user",
            isNewUser: true,
             email,
            tempToken: jwt.sign(
                { email, isTemp: true },
                process.env.JWT_SECRET,
                { expiresIn: "10m" }  // short lived, just enough to fill the form
            )
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
export const completeProfile = async (req, res) => {
    try {
        const { email, name, avatar } = req.body;

        if (!email || !name) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await prisma.user.create({
            data: {
                email,
                name,
                avatar // optional
            }
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "Profile completed",
            user,
            token
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
