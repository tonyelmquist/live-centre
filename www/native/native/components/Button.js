import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Button = props =>
    <View>
        <TouchableHighlight onPress={() => props.handlePress()}>
            <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{ props.title }</Text>
            </View>
        </TouchableHighlight>
    </View>;

Button.propTypes = {
    handlePress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Button;
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'auto'
    },
    textStyle: {
        color: 'white'
    }
});
