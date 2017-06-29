import BaseClass from './baseClass';

export default class Settings extends BaseClass { 
    //Constructor
    constructor(data) {
        super();

        this._language = data.language;
        this._subtitleLanguage = data.subtitleLanguage;
        this._audioLanguage = data.audioLanguage;
        this._recommendations = data.recommendations;
    }

    // Get Set: Language
    get language() {
        return this._language;
    }

    set language(lang) {
        this.validateString(lang);
        this._language = lang;
    }

    // Get Set: Subtitle Language
    get subtitleLanguage() {
        return this._subtitleLanguage;
    }

    set subtitleLanguage(lang) {
        this.validateString(lang);
        this._subtitleLanguage = lang;
    }

    // Get Set: Audio Language
    get audioLanguage() {
        return this._audioLanguage;
    }

    set audioLanguage(lang) {
        this.validateString(lang);
        this._audioLanguage = lang;
    }

    // Get Set: Reccomendations
    get recommendations() {
        return !!this._recommendations;
    }

    set recommendations(bool) {
        this.validateType(bool, 'boolean');
        this._recommendations = bool;
    }

    toggleRecommendations() {
        this._recommendations = !this._recommendations;
    }
    
}
