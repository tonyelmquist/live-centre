import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../../shared/constants/Colors';
// import { Button } from 'react-native-elements';

import FlatScroll from '../components/FlatScroll';
// import Player from '../components/VideoPlayer';

class HomeScreen extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        categories: PropTypes.object.isRequired
    };

    _filterArray = (data, selected) => selected.map(videoIndex => data[videoIndex]);

    _handleItemPress = (assetId) => {
        const { navigate } = this.props.navigation;
        if (assetId) {
            navigate('Modal', { assetId });
        }
    };

    _renderCategories = () => {
        const { categories, data } = this.props;
        return Object.keys(categories).map(key => (
            <View
                key={key}
                style={styles.viewStyle}
                // onPress={() => this.props.navigation.navigate('Modal', { assetId: '221921001' })}
            >
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Modal', { assetId: '221921001' })}
                    activeOpacity={0.2}
                >
                    <View style={styles.categoryViewStyle}>
                        <Text style={styles.categoryTextStyle}>{`${key}`}</Text>

                        <Icon
                            name="md-arrow-forward"
                            size={32}
                            style={{ margin: 5 }}
                            color={Colors.tabIconSelected}
                            type="ionicon"
                        />
                    </View>
                </TouchableOpacity>
                <FlatScroll
                    items={this._filterArray(data, categories[key])}
                    onItemPress={this._handleItemPress}
                />
            </View>
        ));
    };

    render() {
        // const { data } = this.props;
        return (
            <ScrollView style={styles.container}>
                {this._renderCategories()}
                {/* <Player uri={'https://www.mediabank.me/download/manifest.php?assetid=221926001'} /> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    viewStyle: {
        marginBottom: 30
    },
    categoryViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryTextStyle: { fontSize: 18, color: '#2f95dc' }
});

const mapStateToProps = state => ({
    data: state.data,
    categories: state.categories,
    colors: state.colors
});

export default connect(mapStateToProps)(HomeScreen);

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};
