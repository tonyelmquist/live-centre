import Actions from '../constants/reduxConstants';

/**
 * Action to change the language of the application through i18
 * 
 * @memberof Actions
 * @export
 * @param {any} lang - Must be a registered i18 enum (EN or NO)
 * @returns Dispatchable Action
 */
export default function changeLang(lang) {
    return { type: Actions.CHANGE_LANG, lang };
}
