import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

class DrawerScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        colors: PropTypes.object.isRequired
    };

    render() {
        const { SCREEN } = this.props.colors;
        return (
            <View style={[styles.container, { backgroundColor: SCREEN }]}>
                <Text>Drawer Screen</Text>
                <Button
                    handlePress={() => this.props.navigation.navigate('Root')}
                    title="Back Home"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = state => ({
    colors: state.colors
});

export default connect(mapStateToProps)(DrawerScreen);
