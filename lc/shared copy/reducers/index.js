import { combineReducers } from 'redux';
import navigation from './navigation';
import fetchVideos from './fetchVideos';
import categories from './categories';
import theme from './theme';
import device from './device';

export default combineReducers({
    device,
    nav: navigation,
    data: fetchVideos,
    colors: theme,
    categories
});
