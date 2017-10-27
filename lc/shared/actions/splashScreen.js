 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:SplashScreen
 */

import Actions from '../constants/reduxConstants';

/**
 * Action to indicate that a request has been sent to get the user details
 *
 * @memberof Actions:SplashScreen
 * @export
 * @returns Dispatchable Action
 */
export function setSplashScreenShowing(isShowing) {
    return { type: Actions.SET_SPLASH_SHOWING, isShowing };
}

/**
 * Action to indicate that a request has been sent to get the user details
 *
 * @memberof Actions:SplashScreen
 * @export
 * @returns Dispatchable Action
 */
export function setSplashScreenReady(isReady) {
    return { type: Actions.SET_SPLASH_READY, isReady };
}
