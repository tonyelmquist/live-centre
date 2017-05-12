import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

//Actions
import {changeNavMenuIndex} from '../actions/bottomNavMenu';
import {changeLang} from '../actions/lang';
//Custom Components
// import ThumbnailList from '../components/ThumbnailList';
// import Player from '../components/Player';
import HomeGrid from './Grid';
import HeroCarousel from './Carousel';


const styles = {
  headline: {
    fontSize: 24,
    fontWeight: 400,
    height: '100%'
  },
  slide: {
  },
  buttonbar: {
      bottom: 0,
      left: 0,
      position: 'fixed',
  },
  swipeContainer: {
      height: '100%',
      marginTop: '64px',
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
        // console.log(this.props.selectedIndex);
        return (
            <SwipeableViews
                index={this.props.selectedIndex}
                onChangeIndex={(index) => this.select(index)}
                containerStyle={styles.swipeContainer}>
                <div style={styles.slide}>
                    <HeroCarousel />
                    <HomeGrid/>

                </div>
                <div style={styles.slide}>
                    <h2 style={styles.headline}>{i18next.t('route_favorites')}</h2>
                    <div className="player">
                        {/* <Player/> */}
                    </div>
                </div>
                <div style={styles.slide}>
                    <h2 style={styles.headline}>{i18next.t('route_settings')}</h2>
                    <ul>
                        <li>
                            {i18next.t('topics_rendering')};
                        </li>
                        <li>
                            {i18next.t('topics_component')};
                        </li>
                        <li>
                            {i18next.t('topics_state')};
                        </li>

                    </ul>
                    <RaisedButton id="btn_eng" label="ENG" primary={true} onTouchTap={() => {this.handleLang('en');}}/>
                    <RaisedButton id="btn_nor" label="NO" secondary={true} onTouchTap={() => {this.handleLang('nb');}}/>
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
