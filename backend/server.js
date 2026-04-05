import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./db.js";

connectDB();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});