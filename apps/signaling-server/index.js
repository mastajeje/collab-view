"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // 개발 환경에서는 모든 출처 허용
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
});
server.listen(8080, () => {
    console.log(`Signaling server is running on port ${PORT}`);
});
