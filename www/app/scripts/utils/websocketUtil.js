const initEchoServer = () => {
    var socket = new WebSocket('ws://echo.websocket.org/');
        socket.onmessage = function(event) {
          store.dispatch(getMessage(event.data));
        };
}   

