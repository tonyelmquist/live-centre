import BaseClass from './baseClass';

export default class Settings extends BaseClass {
    // Constructor
    constructor(data) {
        super();
        this.assignData({
            _language: '',
            _subtitleLanguage: '',
            _audioLanguage: '',
            _recommendations: 0,
        }, {
            _language: data.language,
            _subtitleLanguage: data.subtitleLanguage,
            _audioLanguage: data.audioLanguage,
            _recommendations: data.recommendations,
        });
    }

    // Get Set: Language
    get language() {
        return this._language;
    }

    set language(lang) {
        this._language = lang;
    }

    // Get Set: Subtitle Language
    get subtitleLanguage() {
        return this._subtitleLanguage;
    }

    set subtitleLanguage(lang) {
        this._subtitleLanguage = lang;
    }

    // Get Set: Audio Language
    get audioLanguage() {
        return this._audioLanguage;
    }

    set audioLanguage(lang) {
        this._audioLanguage = lang;
    }

    // Get Set: Reccomendations
    get recommendations() {
        return !!this._recommendations;
    }

    set recommendations(bool) {
        this._recommendations = bool;
    }

    toggleRecommendations() {
        this._recommendations = !this._recommendations;
    }


}
