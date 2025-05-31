// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let activeChats = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for sending messages
  socket.on('send-message', (message) => {
    console.log('Message received:', message);
    // Emit the message to everyone in the same department
    io.emit('receive-message', message);
  });

  // Listen for disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
