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
}
