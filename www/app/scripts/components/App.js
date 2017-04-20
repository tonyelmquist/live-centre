import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {RaisedButton} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import ThumbnailList from '../components/ThumbnailList';

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
      height: '100%'
  }
};

export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      lng: "nb"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
      this.handleLangChange(this.state.lng);
  }


  handleChange (value) {
    this.setState({
      slideIndex: value,
    });
  }

  handleLangChange(lang){
      i18next.init({
          lng: lang,
          fallbackLng: "en",
          resources: {
              en: {
                  translation: require('../../locale/en_us.po')
              },
              nb: {
                  translation: require('../../locale/nb_no.po')
              }
          }
      });
      this.setState({lng: lang});
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab label={i18next.t('route_home')} value={0} />
          <Tab label={i18next.t('route_about')} value={1} />
          <Tab label={i18next.t('route_topics')} value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          containerStyle={styles.swipeContainer}
        >
         <div style={styles.slide}>
            <h2 style={styles.headline}>{i18next.t('route_home')}</h2>
            <ThumbnailList />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>{i18next.t('route_about')}</h2>
          </div>
          <div style={styles.slide}>
              <h2 style={styles.headline}>{i18next.t('route_topics')}</h2>
              <ul>
                <li>
                    {i18next.t('topics_rendering')}
                </li>
                <li>
                    {i18next.t('topics_component')}
                </li>
                <li>
                    {i18next.t('topics_state')}
                </li>
              </ul>
          </div>
        </SwipeableViews>
         <div style={styles.buttonbar}>
        <RaisedButton label="ENG" primary={true} onClick = {this.handleLangChange.bind(this, "en")}/>
        <RaisedButton label="NOR" secondary={true} onClick = {this.handleLangChange.bind(this, "nb")}/>
        </div>
      </div>
    );
  }
}
