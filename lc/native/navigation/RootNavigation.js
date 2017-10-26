// import React from 'react';
import { TabNavigator } from 'react-navigation';
// import { ScrollView, Text, View } from 'react-native';
import DrawerNavigation from './DraverNavigation';
import LoginScreen from '../screens/LoginScreen';

const RootNavigation = TabNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                tabBarVisible: false
            }
        },
        Content: {
            screen: DrawerNavigation,
            navigationOptions: {
                tabBarVisible: false
            }
        }
    },
    {
        tabBarPosition: 'top',
        lazy: true,
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#e91e63'
        }
    }
);

export default RootNavigation;
// export default DrawerNavigation;
