import i18next from 'i18next';
import enUSTranslation from '../../locale/en_us.po';
import nbNOTranslation from '../../locale/nb_no.po';

export default (store) => {
    i18next.init({
        lngs: ['en', 'nb'],
        lng: store.getState().settings.options.language,
        fallbackLng: 'nb',
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
