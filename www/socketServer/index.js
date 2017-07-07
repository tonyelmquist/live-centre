const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const score = {
    team1Score: 0,
    team2Score: 0,
};

let messageID = 0;

io.on('connection', (socket) => {
    console.log('a user connected');
    io.to(socket.id).emit('SCORE_UPDATE', score);

    socket.on('SENT_MESSAGE', (data) => {
        const message = data;
        message.id = messageID;
        messageID += 1;
        console.log('emitting NEW MESSAGE', message);
        socket.broadcast.emit('NEW_MESSAGE', message);
    });

    socket.on('PENALTY_CARD_EMIT', (data) => {
        const message = data;
        console.log('emitting PENALTY CARD', message);
        socket.broadcast.emit('NEW_PENALTY_CARD', message);
    });
});


setInterval(() => {
    if (Math.random() < 0.5) {
        score.team1Score += 1;
    } else {
        score.team2Score += 1;
    }
    io.emit('SCORE_UPDATE', score);
    console.log('SCORE_UPDATE EMITTED', score);
}, 30000);

http.listen(3000, () => {
    console.log('listening on *:3000');
});
