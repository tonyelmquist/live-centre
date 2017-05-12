import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Header from './Header';

//Pages
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import FavoritePage from './pages/FavoritePage';

//Actions
import {changeNavMenuIndex} from '../actions/bottomNavMenu';
import {changeLang} from '../actions/lang';
//Custom Components
// import ThumbnailList from '../components/ThumbnailList';
// import Player from '../components/Player';
import HomeGrid from './Grid';


const styles = {
  swipeContainer: {
      height: '100%',
      marginBottom: '50px'
  }
};

class MainFrame extends Component {

    select = (index) => this.props.dispatch(changeNavMenuIndex(index));


    handleLang = (newLang) => {
        if (newLang !== this.props.lang ){
            i18next.changeLanguage(newLang, (err, t)=> {
                this.props.dispatch(changeLang(newLang));
            });
        }
    }

    render(){
        //Categories should be created dynamically
        return (
            <SwipeableViews
                index={this.props.selectedIndex}
                onChangeIndex={(index) => this.select(index)}
                containerStyle={styles.swipeContainer} >
                <HomePage/>
                <SettingsPage/>
                <FavoritePage/>

                <div id="category" className="slide">
                    <h1>Category 1</h1>
                    <p>Should be loaded dynamically based on categories</p>
                </div>
            </SwipeableViews>
        );
    }
}

MainFrame.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedIndex:PropTypes.number.isRequired,
    lang:PropTypes.string.isRequired,
    // videos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        selectedIndex: state.navMenu.index,
        lang: state.lang,
        // videos: state.videos.items
    };
};
export default connect(mapStateToProps)(MainFrame);
