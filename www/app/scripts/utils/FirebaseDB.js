import firebase from 'firebase';

export default class FirebaseDB {

    static writeNewUserSettings = (settings, onSuccess, onError) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}`).set({
                settings,
            });
            onSuccess();
        } else {
            onError();
        }
    }

    static writeNewUserProfilePicture = (imageUrl, onSuccess, onError) => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref(`users/${currentUser.uid}/profile/imageUrl`).set(imageUrl);
            onSuccess();
        } else {
            onError();
        }
    }

    static readProfilePicture = (callback) => {
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref(`users/${currentUser.uid}/profile/imageUrl`).once('value').then((snapshot) => {
            console.log('snapshot', snapshot.val());
            if (snapshot.val() === null) {
                firebase.storage().ref('/ProfilePictures/default.png').getDownloadURL().then((url) => {
                    callback(url);
                });
            } else {
                firebase.storage().ref(snapshot.val()).getDownloadURL().then((url) => {
                    callback(url);
                });
            }
        });
    }
}
