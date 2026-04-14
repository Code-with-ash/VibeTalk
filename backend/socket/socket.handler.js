import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    // 🔥 JWT AUTH HERE
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("No token"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // attach user
            next();
        } catch (err) {
            return next(new Error("Invalid token"));
        }
    });

    const rooms = {};

    io.on("connection", (socket) => {
        console.log("User connected:", socket.user.id);

        socket.on("join-room", async ({ roomId }) => {
            const userId = socket.user.id;

            const membership = await prisma.roomUser.findFirst({
                where: { roomId, userId }
            });

            if (!membership) {
                return socket.emit("error", "Not allowed");
            }

            socket.join(roomId);

            if (!rooms[roomId]) rooms[roomId] = [];
            if (!rooms[roomId].includes(userId)) {
                rooms[roomId].push(userId);
            }

            io.to(roomId).emit("room-users", rooms[roomId]);
        });

        socket.on("leave-room", ({ roomId }) => {
            const userId = socket.user.id;

            socket.leave(roomId);

            if (rooms[roomId]) {
                rooms[roomId] = rooms[roomId].filter(id => id !== userId);
                io.to(roomId).emit("room-users", rooms[roomId]);
            }
        });

        socket.on("disconnect", () => {
            const userId = socket.user.id;

            for (const roomId in rooms) {
                rooms[roomId] = rooms[roomId].filter(id => id !== userId);
                io.to(roomId).emit("room-users", rooms[roomId]);
            }
        });
    });
};