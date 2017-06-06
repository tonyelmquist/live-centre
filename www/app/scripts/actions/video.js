import Actions from '../constants/reduxConstants';

export function fetchMetadataSent() {
    return {type: Actions.FETCH_METADATA_SENT};
}

export function fetchMetadataFailed() {
    return {type: Actions.FETCH_METADATA_FAILED};
}

export function fetchMetadataSuccess(items) {
    return {type: Actions.FETCH_METADATA_SUCCESS, items};
}

export function fetchCategoriesSuccess(categories) {
	return {type: Actions.FETCH_CATEGORIES_SUCCESS, categories};
}

export function videoSelected(url) {
    return {type: Actions.VIDEO_SELECTED, url};
}

export function invalidateSelected() {
    return {type: Actions.INVALIDATE_SELECTED};
}

