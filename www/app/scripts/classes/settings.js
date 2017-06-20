export default class Settings { 
    //Constructor
    constructor(data) {
        this.data = data;
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

    toJson() {
        return {
            recommendations: this._recommendations,
            language: this._language,
            audioLanguage: this._audioLanguage,
            subtitleLanguage: this._subtitleLanguage
        };
    }
}