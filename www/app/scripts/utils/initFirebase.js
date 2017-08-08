import firebase from 'firebase';

export default function initFirebase() {
    const config = {
        apiKey: 'AIzaSyAI5Tq2K9UC913ET-3Qi_-Aw0kYrz4IuTI',
        authDomain: 'tfg-media-center.firebaseapp.com',
        databaseURL: 'https://tfg-media-center.firebaseio.com',
        projectId: 'tfg-media-center',
        storageBucket: '',
        messagingSenderId: '38902981364',
    };

    firebase.initializeApp(config);
}
