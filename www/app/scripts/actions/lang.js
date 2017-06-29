import Actions from '../constants/reduxConstants';

export default function changeLang(lang) {
    return { type: Actions.CHANGE_LANG, lang };
}
