import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import StackNavigation from './StackNavigation';
import DrawerScreen from '../screens/DrawerScreen';
import layout from '../../shared/constants/Layout';

const RootNavigation = DrawerNavigator(
    {
        Root: {
            screen: StackNavigation,
            navigationOptions: () => ({
                drawerLabel: 'Home'
            })
        },
        Drawer: {
            screen: DrawerScreen,
            navigationOptions: {
                drawerLabel: 'Drawer Screen'
            }
        }
    },
    {
        drawerWidth: layout.window.width * 1,
        drawerPosition: 'right',
        contentComponent: props => (
            <ScrollView>
                <View style={{ height: 50 }}>
                    <Text>Abc</Text>
                </View>
                <DrawerItems {...props} />
            </ScrollView>
        )
    }
);

export default RootNavigation;
