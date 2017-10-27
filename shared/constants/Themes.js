export default class Themes {
    static get DEFAULT() {
        const tintColor = '#e75';
        return {
            name: 'DEFAULT',
            tintColor,
            ICON_DEFAULT: '#ccc',
            ICON_SELECTED: tintColor,
            TABBAR: '#fefefe',
            ERROR_BG: 'red',
            ERROR_TXT: '#fff',
            WARNING_BG: '#EAEB5E',
            WARNING_TXT: '#666804',
            NOTICE_BG: tintColor,
            NOTICE_TXT: '#fff',
            PANEL: '#e75',
            SCREEN: '#e75',
            SCREEN_SECONDARY: '#455',
            TXT: '#e75',
            TXT_SECONDARY: '#bbb'
        };
    }

    static get LIGHT() {
        return Themes.DEFAULT;
    }

    static get DARK() {
        const tintColor = '#00c497';
        return {
            name: 'DARK',
            tintColor,
            ICON_DEFAULT: '#ccc',
            ICON_SELECTED: tintColor,
            TABBAR: '#fefefe',
            ERROR_BG: 'red',
            ERROR_TXT: '#fff',
            WARNING_BG: '#EAEB5E',
            WARNING_TXT: '#666804',
            NOTICE_BG: tintColor,
            NOTICE_TXT: '#fff',
            PANEL: tintColor,
            SCREEN: '#455',
            SCREEN_SECONDARY: '#677',
            TXT: '#fff',
            TXT_SECONDARY: '#bbb'
        };
    }
}

const getThemeByName = (name) => {
    switch (name) {
        case 'DARK':
            return Themes.DARK;
        default:
            return Themes.DEFAULT;
    }
};
export { getThemeByName };
