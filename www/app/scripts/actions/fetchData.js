import Actions from '../constants/reduxConstants';

//Videos
export function fetchVideoSuccess(items) {
	return {type: Actions.FETCH_VIDEO_SUCCESS, items};
}
export function fetchVideoFailed() {
	return {type: Actions.FETCH_VIDEO_FAILED};
}

//Series
export function fetchSeriesSuccess(items) {
	return {type: Actions.FETCH_SERIES_SUCCESS, items};
}
export function fetchSeriesFailed() {
	return {type: Actions.FETCH_SERIES_FAILED};
}

//Channels
export function fetchChannelsSuccess(items) {
	return {type: Actions.FETCH_CHANNELS_SUCCESS, items};
}
export function fetchChannelsFailed() {
	return {type: Actions.FETCH_CHANNELS_FAILED};
}

//Seasons
export function fetchSeasonsSuccess(items) {
	return {type: Actions.FETCH_SEASONS_SUCCESS, items};
}
export function fetchSeasonsFailed() {
	return {type: Actions.FETCH_SEASONS_FAILED};
}

//Tags
export function fetchTagsSuccess(items) {
	return{type:Actions.FETCH_TAGS_SUCCESS, items};
}
export function fetchTagsFailed(){
	return{type:Actions.FETCH_TAGS_FAILED};
}