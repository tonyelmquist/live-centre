import changeScore from '../actions/score';
import { sendMessage, getMessage } from '../actions/chatMessages';
import io from 'socket.io-client';

const initChangingScores = (store) => {

    const socket = io('localhost:3000');

    socket.on('SCORE_UPDATE', function(data) {
        console.log('SCORE_UPDATE from socket received', data);
        store.dispatch(changeScore(data));
    });

    socket.on('NEW_MESSAGE', function(data) {
        console.log('NEW_MESSAGE from socket received', data);
        store.dispatch(getMessage(data.user, data.message));
    });
    
};

export default initChangingScores;
