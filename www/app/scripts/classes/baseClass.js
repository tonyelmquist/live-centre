export default class BaseClass {

    validateType(value, type, force) {
        if(typeof value != type) {
            if(force === true) {
                console.error(`Error in Setting Class: Wanted ${type}, got ${typeof value} (${value})`);
                throw `Error in Setting Class: Wanted ${type}, got ${typeof value} (${value})`;
            } else {
                console.warn(`Issue in Setting Class: Wanted ${type}, got ${typeof value} (${value})`);
            }
        }
    }

    validateString(value, force) {
        if(typeof value != 'string') {
            if(force === true) {
                console.error(`Error in Setting Class: Wanted string, got ${typeof value} (${value})`);
                throw `Error in Setting Class: Wanted string, got ${typeof value} (${value})`;
            } else {
                console.warn(`Issue in Setting Class: Wanted string, got ${typeof value} (${value})`);
            }
        }
    }
    
    toJson() {
        const result = {};

        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                result[key.substring(1)] = this[key];
            }
        }
        
        return result;
    }
};