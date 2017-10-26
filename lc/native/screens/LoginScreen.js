/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class LoginScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Login Functionality will be implemented here</Text>

                <View style={styles.skip}>
                    <Button
                        onPress={() => navigate('Content')}
                        title="Skip"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                {/* <TouchableOpacity style={styles.skip} onPress={() => navigate('Content')}>
                    <Text style={styles.text}>Skip Login ></Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aquamarine',
        alignItems: 'center',
        justifyContent: 'center'
    },
    skip: {
        marginTop: 50
    },
    text: {
        marginTop: 50,
        padding: 10,
        fontSize: 18,
        color: 'red',
        backgroundColor: 'transparent'
    }
});
