import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import http from "http";
import {initSocket} from "./socket/socket.handler.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
initSocket(server);
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

app.use("/auth", router);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.get("/", (req, res) => {
    res.send("Server is working 🚀");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});