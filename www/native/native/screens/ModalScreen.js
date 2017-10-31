import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Player from '../containers/VideoContainer';
import Parameters from '../../shared/constants/Parameters';

import Colors from '../../shared/constants/Colors';

class ModalScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        // assetid: PropTypes.string.isRequired
        orientation: PropTypes.string.isRequired
    };

    static navigationOptions = {
        header: null
    };

    _handleBack = () => {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };
    render() {
        const isLandscape = this.props.orientation === 'LANDSCAPE';
        return (
            <ScrollView style={styles.container} key={'modal'}>
                <TouchableOpacity onPress={() => this._handleBack()} activeOpacity={0.2}>
                    <Icon
                        name="arrow-back"
                        size={32}
                        style={
                            isLandscape
                                ? { position: 'absolute', top: 0, left: 0, margin: 5, zIndex: 10 }
                                : { margin: 5 }
                        }
                        color={Colors.tabIconSelected}
                    />
                </TouchableOpacity>
                <Player uri={`${Parameters.URI}${this.props.navigation.state.params.assetId}`} />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = state => ({
    orientation: state.device.orientation
});

export default connect(mapStateToProps)(ModalScreen);
