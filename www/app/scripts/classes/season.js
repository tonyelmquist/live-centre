import BaseClass from './baseClass';

class Season extends BaseClass {
    constructor(data) {
        super();
        this._key = data.key;
        this._seasonNumber = data.seasonNumber;
        this._episodes = [data.episode];
        this._episodesFetched = 1;
        this._parentSeries = data.parentSeries; // key to series
    }

    get key() {
        if (typeof this._id === 'undefined') {
        // console.error('Tried to get ID of Series, was not set');
	    return false;
        }
        return this._key;
    }
    set key(newKey) {
        if (newKey) {
            this._key = newKey;
        }
    }

    set parentSeries(seriesKey) {
        if (seriesKey) {
            this._parentSeries = seriesKey;
        } else {
            console.error('Tried to set parentseries to season, did not work.', seriesKey);
        }
    }

    get parentSeries() {
        return this._parentSeries;
    }

    // Push the episode to the end of the episodesarray
    set episode(videoID) {
        if (videoID) {
            this._episodesFetched ++;
            this._episodes.push(videoID);
        }
    }
    set episodes(episodesGroup) {
        if (episodesGroup) {
            this._episodes.push(...episodesGroup);
        }
    }


}
export default Season;

