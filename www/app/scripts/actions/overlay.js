import Actions from '../constants/reduxConstants';

export function showOverlay(){
	return {type: Actions.SHOW_OVERLAY};
}

export function hideOverlay(){
	return {type: Actions.HIDE_OVERLAY};
}
