import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

var messages = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Connection: ' + socket);
  messages.forEach((msg) => {
    socket.emit('message sent', msg);
  });
  socket.on('message sent', (msg) => {
    console.log(msg);
    io.emit('message sent', msg);
    messages.push(msg);
  });
});

io.on('message sent', (msg) => {
  io.emit('message sent', msg);
});

server.listen(3000);
