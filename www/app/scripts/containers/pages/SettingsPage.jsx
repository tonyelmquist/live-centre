import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RaisedButton, SelectField, MenuItem, Toggle, Snackbar, TextField } from 'material-ui';
import { changeLang, changeAudioLang, changeSubtitleLang, toggleRecommendations, saveUserSettings } from '../../actions/settings';
import FormList from '../../components/form/FormList';

const styles = {
    headline: {
        fontSize: 24,
        fontWeight: 400,
        height: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        paddingBottom: '16px',
        marginBottom: '8px',
    },
    container: {
        padding: '20px',
        paddingBottom: '60px',
    },
    underlinedHeaderInline: {
        display: 'inline-block',
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        paddingBottom: '16px',
        marginBottom: '16px',
        marginTop: '32px',
    },
};

const selectBoxStyle = {
    width: '100%',
    color: '#fff',
};

class SettingsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            snackbarIsOpen: false,
            ageRating: '4',
            parentalCode: '1234',
        };
    }

    handleAudioChange = (event) => this.props.dispatch(changeAudioLang(event.target.value));
    handleSubtitleChange = (event) => this.props.dispatch(changeSubtitleLang(event.target.value));
    handleRecommendationsChange = () => this.props.dispatch(toggleRecommendations());
    handleAgeRatingChange = (event) => this.setState({ ageRating: event.target.value })

    handleSaveTouch = () => {
        console.log(this.props.settings.options);
        this.props.dispatch(saveUserSettings(this.props.settings.options));
        // this.state.snackbarIsOpen = true;
    }

    handleLanguageChange = (event) => {
        const newLang = event.target.value;
        if (newLang !== this.props.settings.lang) {
            i18next.changeLanguage(newLang, () => {
                this.props.dispatch(changeLang(newLang));
            });
        }
    }

    render() {
        return (
          <div className="settings-page" style={styles.container}>
            <h1 style={styles.headline}>{i18next.t('setting_title')}</h1>

            <h3 style={styles.underlinedHeaderInline}>{i18next.t('setting_language_options')}</h3>

            <h5>{i18next.t('setting_audio')}</h5>
            <select
              style={selectBoxStyle}
              value={this.props.settings.options.audioLanguage}
              onChange={this.handleAudioChange}
            >
              <option value={'en'}>{i18next.t('language_english')}</option>
              <option value={'nb'}>{i18next.t('language_norwegian')}</option>
            </select>

            <br />

            <h5>{i18next.t('setting_language')}</h5>
            <select
              style={selectBoxStyle}
              value={this.props.settings.options.language}
              onChange={this.handleLanguageChange}
            >
              <option value={'en'}>{i18next.t('language_english')}</option>
              <option value={'nb'}>{i18next.t('language_norwegian')}</option>
            </select>

            <br />

            <h5>{i18next.t('setting_subtitle')}</h5>
            <select
              style={selectBoxStyle}
              value={this.props.settings.options.subtitleLanguage}
              onChange={this.handleSubtitleChange}
            >
              <option value={'en'}>{i18next.t('language_english')}</option>
              <option value={'nb'}>{i18next.t('language_norwegian')}</option>
            </select>

            <h3 style={styles.underlinedHeaderInline}>General Settings</h3>
            <Toggle
              label="Reccomendations"
              toggled={this.props.settings.options.recommendations}
              onToggle={this.handleRecommendationsChange}
            />
            <br />

            <h3 style={styles.underlinedHeaderInline}>Active Devices</h3>
            <FormList />
            <br />

            <h3 style={styles.underlinedHeaderInline}>Parental Controls</h3>
            <h5>Age Rating</h5>
            <select
              style={selectBoxStyle}
              value={this.state.ageRating}
              onChange={this.handleAgeRatingChange}
            >
              <option value={'4'}>4+</option>
              <option value={'9'}>9+</option>
              <option value={'12'}>12+</option>
              <option value={'17'}>17+</option>
              <option value={'all'}>All</option>
            </select>

            <h5>Parental Code</h5>
            <input
              type="password"
              value={this.state.parentalCode}
            />
            <br />

            <RaisedButton label="Save" primary onTouchTap={this.handleSaveTouch} />
          </div>
        );
    }
}

SettingsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(SettingsPage);
