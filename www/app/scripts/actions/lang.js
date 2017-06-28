import Actions from '../constants/reduxConstants';

export function changeLang(lang) {
    return { type: Actions.CHANGE_LANG, lang };
}
