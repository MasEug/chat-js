const express = require('express');
const app = express();

const http = require('http').createServer(app);

const { Server } = require("socket.io");
const io = new Server(http);

const port = process.env.PORT || 80;

users = [];
connections = [];

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log('a user connected');

    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1)
        console.log('off');
    })

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});
