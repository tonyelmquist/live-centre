import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  headline: {
    fontSize: 24,
    fontWeight: 400,
    height: '100%'
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

export default class SettingsPage extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
          <div className="slide">
            <h1 style={styles.headline}>{i18next.t('route_settings')}</h1>
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
        );
    }
}
