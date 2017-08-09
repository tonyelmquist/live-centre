import io from 'socket.io-client';
import changeScore from '../actions/secondLayer';
import { newNotification, rehydrateNotifications } from '../actions/notifications';
import { getMessage } from '../actions/chatMessages';

const initChangingScores = (store) => {
    const socket = io('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com:3000/');

    // socket.on('SCORE_UPDATE', (data) => {
    //     console.log('SCORE_UPDATE from socket received', data);
    //     store.dispatch(changeScore(data));
    // });

    socket.on('NEW_MESSAGE', (data) => {
        console.log('NEW_MESSAGE from socket received', data);
        store.dispatch(getMessage(data.id, 'Anon ' + data.animal, data.message));
    });

    socket.on('NEW_PENALTY_CARD', (data) => {
        console.log('NEW_PENALTY_CARD from socket received', data);
        // store.dispatch(getMessage(data.id, data.user, data.message));
    });

    socket.on('REHYDRATE_NOTIFICATIONS', (data) => {
        console.log('REHYDRATE NOTIFICATIONS');
        store.dispatch(rehydrateNotifications(data));
    })

    socket.on('NOTIFICATIONS', (data) => {
        console.log('NOTIFICATIONS from socket received', data);
        store.dispatch(newNotification(data.id, data.message, data.minutes, data.start));
    });
};

export default initChangingScores;
