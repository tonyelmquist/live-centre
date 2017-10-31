import { NavigationActions } from 'react-navigation';
// import { changeTheme } from '../actions';
import { getThemeByName } from '../constants/Themes';

// Function should be called with explicit context binding
// this should have navigation object (react-navigation) as props

export default function (name, key) {
    const theme = getThemeByName(name);
    const params = {
        params: { colors: theme },
        key,
        routeName: 'Main'
    };
    const setParamsAction = NavigationActions.setParams(params);
    // console.log(this.props.navigation);
    if (this.props) {
        // this.props.dispatch(changeTheme(theme));
        this.props.navigation.dispatch(setParamsAction);
    }
    return params;
}
