import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ChannelsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Channels Screen</Text>
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
