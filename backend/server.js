const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { handleSocketEvents } = require('./socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('../frontend/build'));

io.on('connection', (socket) => {
  console.log('New client connected');
  handleSocketEvents(socket, io);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
