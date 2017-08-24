import firebase from 'firebase';
import store from './store';

export default class FirebaseDB {

    static writeNewUserSettings = (settings, onSuccess, onError) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}/settings`).set({
                settings,
            });
            onSuccess();
        } else {
            onError();
        }
    }

    static currentUserProfileImage = 'https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/ProfilePictures%2Fdefault.png?alt=media&token=f032761a-41b0-4733-99fe-4907d8ce9573';
    static currentUserDisplayName = 'Anon';

    static writeNewUserProfilePicture = (imageUrl, onSuccess, onError) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}/profile/imageUrl`).set(imageUrl);
            onSuccess();
        } else {
            onError();
        }
    }

    static writeNewUserDisplayName = (name, onSuccess, onError) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}/profile/displayName`).set(name);
            onSuccess();
        } else {
            onError();
        }
    }

    static readProfilePicture = (callback) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}/profile/imageUrl`).once('value').then((snapshot) => {
                console.log('snapshot', snapshot.val());
                if (snapshot.val() === null) {
                    firebase.storage().ref('/ProfilePictures/default.png').getDownloadURL().then((url) => {
                        FirebaseDB.currentUserProfileImage = url;
                        callback(url);
                    });
                } else {
                    firebase.storage().ref(snapshot.val()).getDownloadURL().then((url) => {
                        FirebaseDB.currentUserProfileImage = url;
                        callback(url);
                    });
                }
            });
        }
    }

    static currentMessageChannel = null;

    static readMessagesInChannel = (channelId, callback) => {
        // Cleanup of possible old listener
        if (FirebaseDB.currentMessageChannel !== channelId) {
            firebase.database().ref(`messageChannels/${FirebaseDB.currentMessageChannel}`).off('value');

            firebase.database().ref(`messageChannels/${channelId}`).on('value', (snapshot) => {
                if (snapshot.val() === null) {
                    callback({});
                } else {
                    callback(snapshot.val());
                }
            });

            FirebaseDB.currentMessageChannel = channelId;
        }

        if (FirebaseDB.currentMessageChannel === null) {
            FirebaseDB.currentMessageChannel = channelId;

            firebase.database().ref(`messageChannels/${channelId}`).on('value', (snapshot) => {
                if (snapshot.val() === null) {
                    callback({});
                } else {
                    callback(snapshot.val());
                }
            });
        }
    }

    static writeMessageToChannel = (message) => {
        const currentUser = firebase.auth().currentUser;
        if (FirebaseDB.currentMessageChannel === null) {
            console.error('Something went horribly wrong');
            return;
        }

        const newMessage = firebase.database().ref(`messageChannels/${FirebaseDB.currentMessageChannel}`).push();
        newMessage.set({
            senderId: currentUser.uid,
            senderImage: FirebaseDB.currentUserProfileImage,
            senderName: store.getState().authentication.user.displayName,
            text: message,
        });
    }
}
