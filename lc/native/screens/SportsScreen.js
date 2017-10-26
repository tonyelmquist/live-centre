import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SportsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Sports Screen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
