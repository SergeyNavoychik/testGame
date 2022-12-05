const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const getRandomFromRange = (min, max) =>
    min + Math.random() * (max - min);
const sendStartConfig = (socket) => {
    socket.emit('gameConfig', { timeRestartGame: getRandomFromRange(15000, 35000) });
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    sendStartConfig(socket);
    setInterval(() => sendStartConfig(socket), 120000);
});

server.listen(4000, () => {
    console.log('listening on http://localhost:4000');
});