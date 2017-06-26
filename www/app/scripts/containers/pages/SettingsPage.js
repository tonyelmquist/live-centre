import React from 'react';
import {RaisedButton, SelectField, MenuItem, Toggle, Snackbar, TextField} from 'material-ui';
import {changeLang, changeAudioLang, changeSubtitleLang, toggleRecommendations, saveUserSettings} from '../../actions/settings';
import FormList from '../../components/form/FormList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  headline: {
    fontSize: 24,
    fontWeight: 400,
    height: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, .1)',
    paddingBottom: '16px',
    marginBottom: '8px'
  },
  container: {
    padding: '20px',
    paddingBottom: '60px'
  },
  underlinedHeaderInline: {
      display: 'inline-block',
      borderBottom: '1px solid rgba(0, 0, 0, .1)',
      paddingBottom: '16px',
      marginBottom: '16px',
      marginTop: '32px'
  }
};

const selectBoxStyle = {
    width: '100%'
};

class SettingsPage extends React.Component {
    constructor(){
        super();

        this.state = {
            snackbarIsOpen: false,
            ageRating: "4",
            parentalCode: "1234"
        };

    }

    handleAudioChange = (event, index, value) => this.props.dispatch(changeAudioLang(value));
    handleSubtitleChange = (event, index, value) => this.props.dispatch(changeSubtitleLang(value));
    handleRecommendationsChange = () => this.props.dispatch(toggleRecommendations());
    handleAgeRatingChange = (event, index, value) => this.setState({ageRating: value})

    handleSaveTouch = () => {
        this.props.dispatch(saveUserSettings(this.props.settings.options));
        //this.state.snackbarIsOpen = true;
    }

    handleRequestCloseSnackbar = () => {
        this.state.snackbarIsOpen = false;
        console.log(this);
        console.log('Snackbaar', this.state.snackbarIsOpen);
    }

    handleActionTouchTap = () => this.state.snackbarIsOpen = false;

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

            <h3 style={styles.underlinedHeaderInline}>{i18next.t('setting_language_options')}</h3>

            <SelectField
              style={selectBoxStyle}
              floatingLabelText={i18next.t('setting_audio')}
              value={this.props.settings.options.audioLanguage}
              onChange={this.handleAudioChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            <SelectField
              style={selectBoxStyle}
              floatingLabelText={i18next.t('setting_language')}
              value={this.props.settings.options.language}
              onChange={this.handleLanguageChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            <SelectField
              style={selectBoxStyle}
              floatingLabelText={i18next.t('setting_subtitle')}
              value={this.props.settings.options.subtitleLanguage}
              onChange={this.handleSubtitleChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <h3 style={styles.underlinedHeaderInline}>General Settings</h3>
            <Toggle
                label="Reccomendations" 
                toggled={this.props.settings.options.recommendations}
                onToggle={this.handleRecommendationsChange}/>
                <br />

            <h3 style={styles.underlinedHeaderInline}>Active Devices</h3>
            <FormList />
            <br />

            <h3 style={styles.underlinedHeaderInline}>Parental Controls</h3>

            <SelectField
                style={selectBoxStyle}
                floatingLabelText="Age Rating"
                value={this.state.ageRating}
                onChange={this.handleAgeRatingChange} >
                    <MenuItem value={"4"} primaryText="4+" />
                    <MenuItem value={"9"} primaryText="9+" />
                    <MenuItem value={"12"} primaryText="12+" />
                    <MenuItem value={"17"} primaryText="17+" />
                    <MenuItem value={"all"} primaryText="Allow All" />
            </SelectField>

            <TextField
                hintText="####"
                floatingLabelText="Parental PIN code"
                type="password"
                value={this.state.parentalCode}
                />
            <br />

            <RaisedButton label="Save" primary={true} onTouchTap={this.handleSaveTouch} />

            <Snackbar
                open={this.state.snackbarIsOpen}
                message="Settings saved!"
                autoHideDuration={4000}      
                action="undo"
                onActionTouchTap={this.handleActionTouchTap}
                onRequestClose={this.handleRequestCloseSnackbar}/>
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
