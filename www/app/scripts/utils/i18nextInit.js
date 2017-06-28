export default (store) => {
    i18next.init({
        lngs: ['en', 'nb'],
        lng: store.getState().settings.options.language,
        fallbackLng: 'nb',
        resources: {
            en: {
                translation: require('../../locale/en_us.po'),
            },
            nb: {
                translation: require('../../locale/nb_no.po'),
            },
        },
    });
};
