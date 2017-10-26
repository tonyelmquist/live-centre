import React, { Component } from 'react';
import { Immersive } from 'react-native-immersive';
import { Platform, View, NetInfo, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Icon } from 'react-native-elements';
import RootNavigation from '../../native/navigation';
import { connectionState } from '../../shared/actions';
import initVideos from '../../shared/utils/initVideos';

class RootContainer extends Component {
    static defaultProps = {
        isImmersive: false,
        isConnected: true,
        isStatusBarHidden: false
    };

    static propTypes = {
        colors: PropTypes.object.isRequired,
        isConnected: PropTypes.bool,
        isImmersive: PropTypes.bool,
        isStatusBarHidden: PropTypes.bool,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        // Orientation.unlockAllOrientations();
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (status) => {
        this.props.dispatch(connectionState(status));
        initVideos(this.props.dispatch);
    };

    render() {
        // Hide/Show StatusBar
        StatusBar.setHidden(this.props.isStatusBarHidden);
        // Enable Immersive Mode for Android
        Platform.OS === 'android' && Immersive.setImmersive(this.props.isImmersive);

        if (this.props.isConnected === null) {
            return (
                <View style={styles.containerOther}>
                    <ActivityIndicator size="large" animating />
                    {/* <Image
                        style={styles.loadingImage}
                        source={require('../../assets/images/loader.gif')}
                    /> */}
                </View>
            );
        }
        // if (this.props.isConnected) {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                {/* {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />} */}
                {/* {Platform.OS === 'android' && (
                        <StatusBar translusent hidden={this.props.isStatusBarHidden} />
                    )} */}
                {/* {Platform.OS === 'android' && <StatusBar />} */}
                <RootNavigation colors={this.props.colors} />
            </View>
        );
        // }

        // return (
        //     <View style={styles.containerOther}>
        //         <Icon reverse name="signal-wifi-off" type="material" color="#517fa4" />
        //         <Text>Please check the internet connection</Text>
        //     </View>
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerOther: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingImage: {
        width: 100,
        height: 100
    },
    statusBarUnderlay: {}
});

const mapStateToProps = state => ({
    colors: state.colors,
    isConnected: state.device.isConnected,
    layout: state.device.orientation,
    isImmersive: state.device.isImmersive,
    isStatusBarHidden: state.device.isStatusBarHidden
});

export default connect(mapStateToProps)(RootContainer);
