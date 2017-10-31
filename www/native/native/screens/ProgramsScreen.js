import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
// import Carousel from '../components/Carousel';

class ProgramsScreen extends Component {
    // {height, width} = Dimensions.get('window');
    static propTypes = {
        dimensions: PropTypes.object.isRequired,
        appState: PropTypes.string.isRequired
    };

    render() {
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                <Text>
                    {`Height: ${this.props.dimensions.height} \n`}
                    {`Width: ${this.props.dimensions.width} \n\n`}
                    {`Application State: ${this.props.appState} \n`}
                </Text>
            </View>
        );
    }
}

ProgramsScreen.navigationOptions = {
    title: 'Programs'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = state => ({
    dimensions: state.device.dimensions,
    appState: state.device.appState
});

export default connect(mapStateToProps)(ProgramsScreen);
