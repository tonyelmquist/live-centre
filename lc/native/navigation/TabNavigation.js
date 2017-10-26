import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Icon from '../containers/CustomIcon';
import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import MenuScreen from '../screens/MenuScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import SportsScreen from '../screens/SportsScreen';

const _showHeaderIcon = navigate => (
    <TouchableOpacity
        onPress={() => {
            // console.log(navigate);
            navigate('DrawerOpen');
        }}
    >
        <View style={styles.headerRight}>
            <Icon name="user" />
        </View>
    </TouchableOpacity>
);

const screenConfig = {
    Home: {
        screen: HomeScreen
    },
    Programs: {
        screen: ProgramsScreen
    },
    Menu: {
        screen: MenuScreen
    },
    Channels: {
        screen: ChannelsScreen
    },
    Sports: {
        screen: SportsScreen
    }
};

const customOptions = {
    navigationOptions: ({ navigation }) => ({
        title: navigation.state.rootName,
        headerRight: _showHeaderIcon(navigation.navigate),
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName) {
                case 'Home':
                    iconName = 'home';
                    break;
                case 'Programs':
                    iconName = 'list-alt';
                    break;
                case 'Menu':
                    iconName = 'bars';
                    break;
                case 'Channels':
                    iconName = 'television';
                    break;
                case 'Sports':
                    iconName = 'trophy';
            }
            return <Icon selected={focused} name={iconName} />;
        }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false
};

const TabNavigationConfig = TabNavigator(screenConfig, customOptions);

const styles = StyleSheet.create({
    headerRight: {
        padding: 5,
        flexDirection: 'row'
    }
});

TabNavigationConfig.propTypes = {
    focused: PropTypes.bool
};

export default TabNavigationConfig;

export { TabNavigationConfig };
