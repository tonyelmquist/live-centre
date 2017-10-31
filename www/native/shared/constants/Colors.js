const tintColor = '#00c497';

export default class Themes {
    static get DEFAULT() {
        return {
            tintColor,
            ICON_DEFAULT: '#111',
            ICON_SELECTED: '#00c497',
            TABBAR: '#fefefe',
            ERROR_BG: 'red',
            ERROR_TXT: '#fff',
            WARNING_BG: '#EAEB5E',
            WARNING_TXT: '#666804',
            NOTICE_BG: tintColor,
            NOTICE_TXT: '#fff',
            PANEL: '#00c497',
            SCREEN: '#233',
            SCREEN_SECONDARY: '#455',
            TXT: '#fff',
            TXT_SECONDARY: '#bbb',
            CONTROLS: '#39A0ED',
            CONTROLS_BG: '#F1F5F2'
        };
    }

    static get LIGHT() {
        return Themes.DEFAULT;
    }

    static get DARK() {
        return {
            tintColor,
            ICON_DEFAULT: '#111',
            ICON_SELECTED: tintColor,
            TABBAR: '#fefefe',
            ERROR_BG: 'red',
            ERROR_TXT: '#fff',
            WARNING_BG: '#EAEB5E',
            WARNING_TXT: '#666804',
            NOTICE_BG: tintColor,
            NOTICE_TXT: '#fff',
            PANEL: '#00c497',
            SCREEN: '#455',
            SCREEN_SECONDARY: '#677',
            TXT: '#fff',
            TXT_SECONDARY: '#bbb',
            CONTROLS: '#39A0ED',
            CONTROLS_BG: '#F1F5F2'
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
