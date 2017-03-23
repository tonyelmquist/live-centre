import { getApiEndPoint, getParamsObject } from '../utils';

class RestConfig {
    constructor(key, url, method) {
        this.key = key;
        this.config = {
            url: url,
            method: method,
            data: {},
            baseURL: getApiEndPoint(),
            params: getParamsObject(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    getKey() {
        return this.key;
    }

    getConfig() {
        return this.config;
    }

    appendUrl(url) {
        if (!this.config.url.endsWith("/")) {
            this.config.url += "/";
        }
        this.config.url += url;
        return this;
    }

    setData(data) {
        this.config.data = Object.assign({}, this.config.data, data);
        return this;
    }

    setParams(data) {
        this.config.params = Object.assign({}, this.config.params, data);
        return this;
    }
}

export default RestConfig;
