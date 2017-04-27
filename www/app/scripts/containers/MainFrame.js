import React from 'react';
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


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    height: '100%'
  },
  slide: {
    padding: 10,
  },
  buttonbar: {
      bottom: 0,
      left: 0,
      position: 'fixed',
  },
  swipeContainer: {
      height: '100%',
      marginBottom: '50px'

  }
};

class MainFrame extends React.Component {

    select = (index) => this.props.dispatch(changeNavMenuIndex(index));


    handleLang = (newLang) => {
        if (newLang !== this.props.lang ){
            i18next.changeLanguage(newLang, (err, t)=> {
                this.props.dispatch(changeLang(newLang));
            });
        }
    }

    render(){
        // console.log(this.props.videos);
        return (
            <SwipeableViews
                index={this.props.selectedIndex}
                onChangeIndex={this.select}
                containerStyle={styles.swipeContainer}>
                <div style={styles.slide}>
                    <h2 style={styles.headline}>{i18next.t('route_home')}</h2>
                    {/* <ThumbnailList /> */}
                    <HomeGrid videos = {this.props.videos}/>

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
                    <RaisedButton label="ENG" primary={true} onTouchTap={() => {this.handleLang('en');}}/>
                    <RaisedButton label="NO" secondary={true} onTouchTap={() => {this.handleLang('nb');}}/>
                </div>
            </SwipeableViews>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedIndex: state.navMenu.index,
        lang: state.lang,
        videos: state.videos.items
    };
};
export default connect(mapStateToProps)(MainFrame);
