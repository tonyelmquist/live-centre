import diff from 'deep-diff';

export default class BaseClass {

    assignData(base, mapped) {
        Object.assign(this, base);

        Object.assign(this, mapped);
        this.validateObject(this, mapped);
    }

    /* Validation Functions */
    validateType(value, type, force) {
        if (typeof value !== type) {
            if (force === true) {
                console.error(`Error in Setting Class: Wanted ${type}, got ${typeof value} (${value})`);
                throw `Error in Setting Class: Wanted ${type}, got ${typeof value} (${value})`;
            } else {
                console.warn(`Issue in Setting Class: Wanted ${type}, got ${typeof value} (${value})`);
            }
        }
    }

    validateString(value, force) {
        if (typeof value !== 'string') {
            if (force === true) {
                console.error(`Error in Setting Class: Wanted string, got ${typeof value} (${value})`);
                throw `Error in Setting Class: Wanted string, got ${typeof value} (${value})`;
            } else {
                console.warn(`Issue in Setting Class: Wanted string, got ${typeof value} (${value})`);
            }
        }
    }

    validateObject(initialState, data) {
        // Accept data objects of null, as the initial state is what is required
        if (data != null) {
            const results = diff(initialState, data);

            if (typeof results === 'undefined') {
                return;
            }

            // for( let i = 0; i <= initialState.length; i++) {
            //     console.log(initialState[i]);
            // }

            const missingKeys = results.filter((result) =>
                // Only kept the deleted ones (i.e. listed in the initial state
                // but not in the data added
                 result.kind === 'D');

            for (const missingKey of missingKeys) {
                console.warn(`${initialState.constructor.name} is missing property: ${missingKey.path}`);
            }
        }
    }

    /* Helper Functions */
    toJson() {
        const result = {};

        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                result[key.substring(1)] = this[key];
            }
        }

        return result;
    }

    hasMany(type) {

    }

    belongsTo(type) {

    }
}
