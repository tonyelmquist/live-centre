import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';

export default class ScrollItem extends Component {
    static defaultProps = {
        height: 180,
        width: 250,
        handlePress: () => {}
    };
    static propTypes = {
        uri: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        height: PropTypes.number,
        width: PropTypes.number,
        handlePress: PropTypes.func
    };
    render() {
        const { height, width, uri, title, handlePress } = this.props;

        return (
            <Content style={{ height, width }}>
                <TouchableOpacity onPress={handlePress} activeOpacity={0.75}>
                    <Card>
                        <CardItem cardBody>
                            <Image style={styles.imageStyle} source={{ uri }} />
                        </CardItem>
                        <CardItem footer style={{ height: 48, marginBottom: 8 }}>
                            <Body>
                                <Text data-jest="title">{title}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </Content>
        );

        // return (
        //     <View style={[styles.container, { height: height, width: width }]}>
        //     <TouchableOpacity
        //         onPress={handlePress}
        //         style={styles.touchWraper}
        //         activeOpacity={0.75}
        //     >
        //         <Image style={styles.imageStyle} source={{ uri: uri }} />
        //         <View style={styles.overlayStyle}>
        //             <Text>{title}</Text>
        //         </View>
        //     </TouchableOpacity>
        // </View>
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#2f95dc',
        marginRight: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    touchWraper: {
        flex: 1
    },
    overlayStyle: {
        flex: 1,
        position: 'absolute',
        height: 50,
        // width: null,
        borderBottomWidth: 1,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        flexDirection: 'row',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    imageStyle: {
        // flex: 1,
        height: 110,
        width: 250
        // borderWidth: 1,
        // borderRadius: 5
    }
});
