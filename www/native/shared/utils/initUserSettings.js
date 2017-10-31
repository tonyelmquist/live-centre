// import axios from 'axios';
// import i18next from 'i18next';
// import { fetchUserSettingsSent, fetchUserSettingsSuccess, changeLang } from '../actions/settings';
// import Settings from '../classes/settings';

// const initUserSettings = (store) => {
//     store.dispatch(fetchUserSettingsSent());
//     const promise = axios({
//         method: 'get',
//         url: 'http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/user',
//         headers: {
//             Authorization: 'Basic mcAPI2o17-H35t-password',
//         },
//     }).then((result) => {
//         const settings = new Settings(result.data);
//         const newLang = settings.language;

//         store.dispatch(fetchUserSettingsSuccess(settings));
//         i18next.changeLanguage(newLang, () => {
//             store.dispatch(changeLang(newLang));
//         });
//     });
//     return promise;
// };

// export default initUserSettings;
