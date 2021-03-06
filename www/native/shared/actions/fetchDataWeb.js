 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:FetchData
 */

import Actions from '../constants/reduxConstants';

/** FETCHING VIDEOS */

/**
 * Action to indicate success of fetching a single video
 *
 * @memberof Actions:FetchData
 * @export
 * @param {Video} video
 * @returns Dispatchable Action
 */
export function fetchVideoSuccess(video) {
    return { type: Actions.FETCH_VIDEO_SUCCESS, video };
}

/**
 * Action to indicate success of fetching multiple videos
 *
 * @memberof Actions:FetchData
 * @export
 * @param {any} videogroup
 * @param {any} length
 * @returns Dispatchable Action
 */
export function fetchVideosSuccess(videogroup, length) {
    return { type: Actions.FETCH_VIDEOS_SUCCESS, videogroup, length };
}

/**
 * Action to indicate failure of fetching video
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function fetchVideoFailed() {
    return { type: Actions.FETCH_VIDEO_FAILED };
}

/** FETCHING SERIES */

/**
 * Action to indicate success of fetching series, and to update the store
 *
 * @memberof Actions:FetchData
 * @param {any} items
 * @returns Dispatchable Action
 */
export function fetchSeriesSuccess(items) {
    return { type: Actions.FETCH_SERIES_SUCCESS, items };
}

/**
 * Action to indicate failure of fetching series
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function fetchSeriesFailed() {
    return { type: Actions.FETCH_SERIES_FAILED };
}

/** FETCHING CHANNELS */

/**
 * Action to indicate success of fetching channels, and ot update the store
 *
 * @memberof Actions:FetchData
 * @export
 * @param {any} items
 * @returns Dispatchable Action
 */
export function fetchChannelsSuccess(items) {
    return { type: Actions.FETCH_CHANNELS_SUCCESS, items };
}

/**
 * Action to indicate failure of fetching channels
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function fetchChannelsFailed() {
    return { type: Actions.FETCH_CHANNELS_FAILED };
}

/** FETCHING SEASONS */

/**
 * Action to indicate success of fetching seasons, and to update the store
 *
 * @memberof Actions:FetchData
 * @export
 * @param {any} items
 * @returns Dispatchable Action
 */
export function fetchSeasonsSuccess(items) {
    return { type: Actions.FETCH_SEASONS_SUCCESS, items };
}

/**
 * Action to indicate failure to fetch seasons
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function fetchSeasonsFailed() {
    return { type: Actions.FETCH_SEASONS_FAILED };
}

/** FETCHING TAGS */

/**
 * Action to indicate the success of fetching tags, and to update the store
 *
 * @memberof Actions:FetchData
 * @export
 * @param {any} items
 * @returns Dispatchable Action
 */
export function fetchTagsSuccess(items) {
    return { type: Actions.FETCH_TAGS_SUCCESS, items };
}

/**
 * Action to indicate failure of fetching tags
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function fetchTagsFailed() {
    return { type: Actions.FETCH_TAGS_FAILED };
}

/**
 * Action to indicate failure of fetching tags
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function insertMatchData(id, data) {
    return { type: Actions.INSERT_MATCH_DATA, id, data };
}

/**
 * Action to indicate failure of fetching tags
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function insertPlayerData(id, data) {
    return { type: Actions.INSERT_PLAYER_DATA, id, data };
}

/**
 * Action to insert team data to store
 *
 * @memberof Actions:FetchData
 * @export
 * @returns Dispatchable Action
 */
export function insertTeamData(id, data) {
    return { type: Actions.INSERT_TEAM_DATA, id, data };
}
