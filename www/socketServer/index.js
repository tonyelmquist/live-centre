const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let score = 10;

io.on('connection', function(socket){
  console.log('a user connected');
  io.to(socket.id).emit('SCORE_UPDATE', score)

  socket.on('SENT_MESSAGE', function(data) {
    console.log('emitting NEW MESSAGE', data);
    socket.broadcast.emit('NEW_MESSAGE', data);
  });
});


setInterval(function() {
  score += 2;
  io.emit('SCORE_UPDATE', score);
  console.log('SCORE_UPDATE EMITTED', score);
}, 10000)

http.listen(3000, function(){
  console.log('listening on *:3000');
});