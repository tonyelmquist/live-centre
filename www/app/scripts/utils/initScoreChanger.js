import io from 'socket.io-client';
import changeScore from '../actions/score';
import { getMessage } from '../actions/chatMessages';

const initChangingScores = (store) => {
    const socket = io('localhost:3000');

    socket.on('SCORE_UPDATE', (data) => {
        console.log('SCORE_UPDATE from socket received', data);
        store.dispatch(changeScore(data));
    });

    socket.on('NEW_MESSAGE', (data) => {
        console.log('NEW_MESSAGE from socket received', data);
        store.dispatch(getMessage(data.id, data.user, data.message));
    });
};

export default initChangingScores;
