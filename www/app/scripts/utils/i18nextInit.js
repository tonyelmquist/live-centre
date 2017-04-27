export default (store) => {
    i18next.init({
        lngs: ["en","nb"],
        lng: store.getState().lang,
        fallbackLng: "en",
        resources: {
            en: {
                translation: require('../../locale/en_us.po')
            },
            nb: {
                translation: require('../../locale/nb_no.po')
            }
        }
    });
};
