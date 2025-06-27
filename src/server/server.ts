import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from 'http';
import 'dotenv/config'

const PORT = 8080;

const app = express();
app.use(cors());


const server = createServer(app);

const API_BASE_URL = process.env.API_ENDPOINT;

const userSocketMap = new Map<string, string>();

const io = new Server(server, {
    cors: { origin: "*" },
});


if (!API_BASE_URL) {
    throw new Error('❌ API_ENDPOINT is not defined in the .env file');
}

app.get('/styles', async (_req, res) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`External API error: ${response.statusText}`);
        }

        const json = await response.json();
        res.json(json);
    } catch (error) {
        console.error('❌ Failed to fetch external API:', error);
        res.status(500).json({ error: 'Failed to fetch external data' });
    }
});

io.on("connection", (socket) => {
    //DEBUG LINE: console.log("User connected:", socket.id);

    socket.on("register", (userId: string) => {
        userSocketMap.set(userId, socket.id);
    });

    socket.on("send_message", ({ toUserId, message, fromUserId }) => {
        const targetSocketId = userSocketMap.get(toUserId);

        //DEBUG LINE: console.log(`Message from ${fromUserId} to ${toUserId}: ${message}`);

        if (targetSocketId) {
            io.to(targetSocketId).emit("receive_message", {
                from: fromUserId,
                to: toUserId,
                message,
            });
        }
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});