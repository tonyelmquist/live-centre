import diff from 'deep-diff';
import store from '../utils/store';

export default class BaseClass {

    assignData(base, mapped) {
        Object.assign(this, base);

        Object.assign(this, mapped);
        BaseClass.validateObject(this, mapped);
    }

    /* Validation Functions */
    static validateObject(initialState, data) {
        // Accept data objects of null, as the initial state is what is required
        if (data != null) {
            const results = diff(initialState, data);

            if (typeof results === 'undefined') {
                return;
            }

            // for( let i = 0; i <= initialState.length; i++) {
            //     console.log(initialState[i]);
            // }

            const missingKeys = results.filter(result =>
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
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                result[key.substring(1)] = this[key];
            }
        }

        return result;
    }


    hasMany(storePosition, foreignKey) {
        const keys = this[foreignKey];

        let state = store.getState();

        if (storePosition.length === 1) {
            state = state[storePosition[0]];
        } else if (storePosition.length === 2) {
            state = state[storePosition[0]][storePosition[1]];
        }

        if (typeof state === 'undefined') {
            console.error({ name: 'State not found', message: 'Error, Store position inputted does not exist!', storePosition });
        }

        let result = [];

        for (let i = 0; i < keys.length; i++) {
            if (typeof state[keys[i]] === 'undefined') {
                console.error({ name: 'Foreign key not found', message: 'Did not find relevant foreign key', state, key: keys[i] });
            }

            result[i] = state[keys[i]];
        }

        return result;
    }

    // belongsTo(type) {

    // }
}