import diff from 'deep-diff';

export default class BaseClass {

    assignData(base, mapped) {
        BaseClass.validateObject(base, mapped);
        Object.assign(this, base);
        Object.assign(this, mapped);
    }

    static validateObject(initialState, data) {
        // Accept data objects of null, as the initial state is what is required
        if (data != null) {
            const results = diff(initialState, data);

            if (typeof results === 'undefined') {
                return;
            }

            for (const key in Object.keys(initialState)) {
                if (Object.prototype.hasOwnProperty.call(initialState, key) && Object.prototype.hasOwnProperty.call(data, key)) {
                    if (typeof initialState[key] !== typeof data[key]) {
                        console.warn(`Type mismatch for key ${key} inside the ${this.constructor.name} class (${typeof initialState[key]} != ${typeof data[key]})`);
                    }
                }
            }

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

//     hasMany(type) {

//   }

//     belongsTo(type) {

//   }
}
