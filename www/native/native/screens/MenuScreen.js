import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import { Video } from 'expo';
// import VideoControls from '../components/VideoControls';
// import changeColors from '../utils/colors';

class MenuScreen extends Component {
    static propTypes = {
        colors: PropTypes.object.isRequired
        // navigation: PropTypes.object.isRequired,
        // routeKey: PropTypes.string.isRequired
        // dispatch: PropTypes.func.isRequired
    };

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        if (params) {
            return {
                headerStyle: { backgroundColor: params.colors.PANEL }
            };
        }
        return {};
    };

    render() {
        // console.log(this.props.routeKey);
        const { SCREEN } = this.props.colors;
        return <View style={[styles.container, { backgroundColor: SCREEN }]} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = state => ({
    colors: state.colors
    // routeKey: state.nav.routes[0].routes[0].routes[0].key
    // routeKey
});

export default connect(mapStateToProps)(MenuScreen);
