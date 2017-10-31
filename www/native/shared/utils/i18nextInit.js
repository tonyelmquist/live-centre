import i18next from 'i18next';
import enUSTranslation from '../../../app/locale/en_us.po';
import nbNOTranslation from '../../../app/locale/nb_no.po';

export default (store) => {
    i18next.init({
        lngs: ['en', 'nb'],
        lng: store.getState().settings.options.language,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: enUSTranslation,
            },
            nb: {
                translation: nbNOTranslation,
            },
        },
    });
};
