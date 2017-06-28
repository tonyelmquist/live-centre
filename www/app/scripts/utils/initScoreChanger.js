import { changeScore } from '../actions/score';

const initChangingScores = (store) => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = function (event) {
        store.dispatch(changeScore(event.data));
    };
};

export default initChangingScores;
