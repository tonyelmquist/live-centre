import React from 'react';
import {RaisedButton, SelectField, MenuItem, Toggle} from 'material-ui';
import {changeLang, changeAudioLang, changeSubtitleLang, toggleRecommendations, saveUserSettings} from '../../actions/settings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  },
  container: {
    padding: '20px'
  }
};

class SettingsPage extends React.Component {
    constructor(){
        super();
    }

    handleAudioChange = (event, index, value) => this.props.dispatch(changeAudioLang(value));
    handleSubtitleChange = (event, index, value) => this.props.dispatch(changeSubtitleLang(value));
    handleRecommendationsChange = () => this.props.dispatch(toggleRecommendations());
    handleSaveTouch = () => this.props.dispatch(saveUserSettings(this.props.settings.options));

    handleLanguageChange = (event, index, newLang) => {
        if (newLang !== this.props.settings.lang ){
            i18next.changeLanguage(newLang, (err, t)=> {
                this.props.dispatch(changeLang(newLang));
            });
        }
    }

    render(){
        return(
          <div className="settings-page" style={styles.container}>
            <h1 style={styles.headline}>{i18next.t('setting_title')}</h1>

            <h3>{i18next.t('setting_language_options')}</h3>

            <SelectField
              floatingLabelText={i18next.t('setting_audio')}
              value={this.props.settings.options.audioLanguage}
              onChange={this.handleAudioChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            <SelectField
              floatingLabelText={i18next.t('setting_language')}
              value={this.props.settings.options.language}
              onChange={this.handleLanguageChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            <SelectField
              floatingLabelText={i18next.t('setting_subtitle')}
              value={this.props.settings.options.subtitleLanguage}
              onChange={this.handleSubtitleChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <h3>General Settings</h3>
            <Toggle
                label="Reccomendations" 
                toggled={this.props.settings.options.recommendations}
                onToggle={this.handleRecommendationsChange}/>

            <RaisedButton label="Save" primary={true} onTouchTap={this.handleSaveTouch} />
          </div>
        );
    }
}

SettingsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps)(SettingsPage);
