
class StoreUtils {
    static inProgress(state, key) {
        return state.progress.states[key] == null ? false : state.progress.states[key].inProgress;
    }

    static isSuccess(state, key) {
        return state.progress.states[key] == null ? true : state.progress.states[key].isSuccess;
    }

    static hasData(state, key) {
        return state.rest.responses[key] == null ? false : true;
    }

}

export default StoreUtils;
