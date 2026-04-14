import express from "express";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
const router = express.Router();
export const createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const hostId = req.user.id;
        if (!name) {
            return res.status(400).json({ message: "Room name required" });
        }

        const room = await prisma.room.create({
            data: {
                name,
                hostId
            }
        });

        await prisma.roomUser.create({
            data: {
                roomId: room.id,
                userId: req.user.id
            }
        });

        return res.json({
            message: "Room created",
            room
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
export const joinRoom = async (req, res) => {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ message: "Room ID required" });
        }

        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const existing = await prisma.roomUser.findFirst({
            where: {
                roomId,
                userId: req.user.id
            }
        });

        if (existing) {
            return res.json({ message: "Already joined" });
        }

        await prisma.roomUser.create({
            data: {
                roomId,
                userId: req.user.id
            }
        });

        return res.json({ message: "Joined room" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
export const getRoomUsers = async (req, res) => {
    try {
        const { roomId } = req.params;
        const membership = await prisma.roomUser.findFirst({
            where: {
                roomId,
                userId: req.user.id
            }
        });

        if (!membership) {
            return res.status(403).json({ message: "Not part of this room" });
        }
        const users = await prisma.roomUser.findMany({
            where: { roomId },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        return res.json({ users });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const leaveRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({ message: "Room ID required" });
        }

        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const membership = await prisma.roomUser.findFirst({
            where: {
                roomId,
                userId: req.user.id
            }
        });

        if (!membership) {
            return res.status(400).json({ message: "You are not in this room" });
        }

        await prisma.roomUser.delete({
            where: {
                roomId_userId: {
                    roomId,
                    userId: req.user.id
                }
            }
        });

        return res.json({ message: "Left room" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        if (userId !== room.hostId) {
            return res.status(403).json({ message: "You are not the host" });
        }

        await prisma.room.delete({
            where: { id: roomId }
        });

        return res.json({ message: "Room deleted" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
export const getMyRooms = async (req, res) => {
    try {
        const rooms = await prisma.roomUser.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                room: true
            }
        });

        return res.json({ rooms });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};