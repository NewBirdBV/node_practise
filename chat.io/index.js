const express = require('express'),
    app = express.createServer(),
    io = require('socket.io')(app);

app.use(express.static(`${__dirname}/public`));
app.use(express.bodyParser());

app.get('/', function (req, res, next) {
    res.send(200);
});

io.on('connection', (socket) => {
    socket.on('join', function (name) {
        socket.nickname = name;
        socket.broadcast.emit('hello', `${name} join the chat.`);
    });
    socket.on('text', function (msg, fn) {
        socket.broadcast.emit('text', socket.nickname, msg);
        fn(Date.now())
    });
});

app.listen(3000);
