import firebase from 'firebase';
import i18next from 'i18next';
import { loginSuccess, logoutSuccess } from '../actions/authentication';
import store from './store';
import { fetchUserSettingsSuccess, changeLang } from '../actions/settings';

export default class Authentication {

    static init = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in');
                // User is signed in.
                const displayName = user.displayName;
                const email = user.email;
                const emailVerified = user.emailVerified;
                const photoURL = user.photoURL;
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                const providerData = user.providerData;

                store.dispatch(loginSuccess({ uid, email, emailVerified, isAnonymous, displayName, photoURL, providerData }));

                // Set settings
                let settings = {
                    audioLanguage: 'nb',
                    language: 'en',
                    recommendations: 1,
                    subtitleLanguage: 'nb',
                };

                let profile = {
                    displayName: 'Name',
                    imageUrl: null,
                    description: 'This is me!',
                };

                const firebaseCurrentUserRef = firebase.database().ref(`/users/${uid}`);

                firebaseCurrentUserRef.on('value', (snapshot) => {
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

                        if (typeof snapshot.val().profileInfo === 'undefined') {
                            firebaseCurrentUserRef.child('profile').set(profile);
                        } else {
                            profile = snapshot.val().profile;
                        }
                        // Otherwise, use info from firebase
                    }

                    store.dispatch(fetchUserSettingsSuccess(settings));
                    i18next.changeLanguage(settings.language, () => {
                        store.dispatch(changeLang(settings.language));
                    });

                    console.log('Profile info', profile);
                });
            } else {
                console.log('User is NOT signed in');
            }
        });
    }

    signInAttempt = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
            // ...
        });
    }

    logoutAttempt = () => {
        firebase.auth().signOut().then(() => {
            console.log('Signout Success');
            store.dispatch(logoutSuccess());
        }, (error) => {
            console.log('ERROR Sign out', error);
        });
    }

    userIsAuthenticated = () => {}

    userIsNotAuthenticated = () => {}
}
