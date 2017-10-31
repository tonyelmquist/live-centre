import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import ScrollItem from './ScrollItem';

export default class FlatScroll extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired
    };
    _renderScrollItem(item) {
        return (
            <ScrollItem
                uri={item.thumbnail}
                title={item.title}
                handlePress={() => {
                    this.props.onItemPress(item.id);
                }}
            />
        );
    }
    _keyExtractor = item => item.id;

    render() {
        return (
            <FlatList
                style={styles.scrollViewStyle}
                horizontal // scrolling left to right instead of top to bottom
                showsHorizontalScrollIndicator={false} // hides native scrollbar
                data={this.props.items}
                keyExtractor={this._keyExtractor}
                // scrollEventThrottle={10} // how often we update the position of indicator bar
                renderItem={({ item }) => this._renderScrollItem(item)}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        marginBottom: 5
    }
});
