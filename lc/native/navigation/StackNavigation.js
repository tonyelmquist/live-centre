import { StackNavigator } from 'react-navigation';

import TabNavigation from './TabNavigation';
import ModalScreen from '../screens/ModalScreen';

const navigationConfig = {
    tabBarVisible: false
};

const stackNavigationConfig = StackNavigator(
    {
        Main: {
            screen: TabNavigation,
            navigationOptions: ({ navigation }) => {
                const { index } = navigation.state;
                const { routeName } = navigation.state.routes[index];
                const { params } = navigation.state;

                if (params) {
                    return {
                        title: routeName,
                        headerStyle: {
                            backgroundColor: params.colors.PANEL ? params.colors.PANEL : ''
                        },
                        tabBarVisible: false
                    };
                }

                return { title: routeName };
            }
        },
        Modal: {
            screen: ModalScreen
        }
    },
    navigationConfig
);

export { stackNavigationConfig };
export default stackNavigationConfig;
