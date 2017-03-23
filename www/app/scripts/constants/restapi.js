import { RestConfig } from '../data';
import { ReduxConstants } from '../constants';

class RestAPI {
    static get LOGIN() { return new RestConfig(ReduxConstants.REST_LOGIN, "client/login", 'post'); }
    static get VERIFY() { return new RestConfig(ReduxConstants.REST_VERIFY, "client/authenticate", 'post'); }

    static get CAMERAS() { return new RestConfig(ReduxConstants.REST_CAMERAS, "cameras/all/snapshot", 'get'); }

}

export default RestAPI;
