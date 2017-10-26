import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppState, StyleSheet, View } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import RootComponent from './native/containers/RootContainer';
// import RootComponent from './src/components/';
import store from './shared/utils/store';
import { orientationState, dimensions, appState } from './shared/actions';
import Platform from './shared/utils/platform';

class App extends Component {
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleLayout = (dispatch) => {
        dispatch(orientationState(Platform.orientation()));
        dispatch(dimensions());
    };

    _handleAppStateChange = (nextAppState) => {
        store.dispatch(appState(nextAppState));
    };
    render() {
        return (
            <Provider store={store}>
                <View
                    style={styles.container}
                    onLayout={() => {
                        this._handleLayout(store.dispatch);
                    }}
                >
                    <RootComponent />
                </View>
            </Provider>
        );
    }
}

export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
