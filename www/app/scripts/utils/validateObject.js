import diff from 'deep-diff';

	function validateObject(initialState, data) {
        // Accept data objects of null, as the initial state is what is required
        if (data != null) {

            const results = diff(initialState, data);

            if(typeof results=='undefined'){
                return;
            }

            const missingKeys = results.filter((result) => {
                // Only kept the deleted ones (i.e. listed in the initial state
                // but not in the data added
                return result.kind == "D";
            });
            for ( const missingKey of missingKeys ) {
                console.warn(`${initialState.constructor.name} is missing property: ${missingKey.path}`);
            }
        }
    }
export default validateObject