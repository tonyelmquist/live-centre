import changeScore from '../actions/score';
import io from 'socket.io-client';

const initChangingScores = (store) => {

    const socket = io('localhost:3000');

    socket.on('SCORE_UPDATE', function(data) {
        console.log('SCORE_UPDATE from socket received', data);
        store.dispatch(changeScore(data));
    });
};

export default initChangingScores;
