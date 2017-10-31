import firebase from 'firebase';
import i18next from 'i18next';
import { loginSuccess, logoutSuccess, setDisplayName } from '../actions/authentication';
import store from './storeWeb';
import { fetchUserSettingsSuccess, changeLang } from '../actions/settings';
import FirebaseDB from '../utils/FirebaseDB';

export default class Authentication {

    static init = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in');
                // User is signed in.
                const email = user.email;
                const emailVerified = user.emailVerified;
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                const providerData = user.providerData;

                FirebaseDB.readProfilePicture((url) => {
                    FirebaseDB.readDisplayName((name) => {
                        store.dispatch(loginSuccess({ uid, email, emailVerified, isAnonymous, displayName: name, photoURL: url, providerData }));
                    });
                });


                // Set settings
                let settings = {
                    audioLanguage: 'nb',
                    language: 'en',
                    recommendations: 1,
                    subtitleLanguage: 'nb',
                };

                let profile = {
                    displayName: 'Anon',
                    imageUrl: '/ProfilePictures/default.png',
                    description: 'This is me???',
                };

                let notifications = {
                    0: {
                        message: 'This is a test notification',
                    },
                };

                const firebaseCurrentUserRef = firebase.database().ref(`/users/${uid}`);

                firebaseCurrentUserRef.once('value', (snapshot) => {
                    if (snapshot.val() === null) {
                        // If no user info, set default info in firebase
                        firebaseCurrentUserRef.set({
                            settings,
                            profile,
                        });
                    } else {
                        if (typeof snapshot.val().settings === 'undefined') {
                            firebaseCurrentUserRef.child('settings').set(settings);
                        } else {
                            settings = snapshot.val().settings;
                        }

                        if (typeof snapshot.val().profile === 'undefined') {
                            firebaseCurrentUserRef.child('profile').set(profile);
                        } else {
                            profile = snapshot.val().profile;
                        }

                        if (typeof snapshot.val().notifications === 'undefined') {
                            firebaseCurrentUserRef.child('notifications').set(notifications);
                        } else {
                            notifications = snapshot.val().notifications;
                        }
                    }

                    store.dispatch(fetchUserSettingsSuccess(settings));
                    i18next.changeLanguage(settings.language, () => {
                        store.dispatch(changeLang(settings.language));
                    });

                    store.dispatch(setDisplayName(profile.displayName));

                    FirebaseDB.readProfilePicture(() => {});
                });
            } else if (navigator.language.indexOf('nb') !== -1) {
                i18next.changeLanguage('nb', () => {
                });
            } else {
                i18next.changeLanguage('en', () => {
                });
            }
        });
    }

    static signInAttempt = (email, password, callback) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            callback(true);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            callback(false, { errorCode, errorMessage });
            console.error(errorCode, errorMessage);
        });
    }

    logoutAttempt = () => {
        firebase.auth().signOut().then(() => {
            store.dispatch(logoutSuccess());
        }, (error) => {
            console.error('ERROR Sign out', error);
        });
    }

    userIsAuthenticated = () => {}

    userIsNotAuthenticated = () => {}
}
