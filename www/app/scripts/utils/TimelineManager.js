export default class TimelineManager {
    /**
     * Creates an instance of TimelineManager.
     * @param {array} timeline - The timeline of items
     * @param {object} [opts={}]
     * @memberof TimelineManager
     */
    constructor() {
        this._timeline = [];

        // We HAVE to assume that the first event happens at the beginning of the video, therefore this buffer exists if this isn't the case
        this._buffer = 0;

        // Setup
        // The current active events within the timeline
        this._activeEvents = [];
    }

    get timeline() {
        return this._timeline;
    }

    set timeline(newTimeline) {
        if (typeof newTimeline === 'undefined') {
            console.error('Tried to set timeline to undefined, pls no');
            return;
        }
        const timeline = newTimeline;
        for (let i = 0; i < timeline.length; i++) {
            if (typeof timeline[i].time === 'undefined') {
                console.error('Timeline Manager Failed to set timeline - all objects inside array must have a Time attribute');
                return;
            }
        }
        console.log('new timeline set', timeline);
        this._timeline = timeline;
    }

    set buffer(newBuffer) {
        this._buffer = newBuffer;
    }

    /**
     * Returns an array of active events from the timeline
     *
     * @param {number} timestamp - Milliseconds of time to check
     * @memberof TimelineManager
     */
    setActiveTimelineEvents(timestamp) {
        this._activeEvents = [];
        for (let i = 0; i < this._timeline.length; i++) {
            if ((new Date(this._timeline[i].time) - new Date(this._timeline[0].time)) + parseInt(this._buffer) < timestamp) {
                this._activeEvents.push(this._timeline[i]);
            }
        }

        console.log('active events at stamp', timestamp, this._activeEvents);
    }

    get activeEvents() {
        return this._activeEvents;
    }
}
