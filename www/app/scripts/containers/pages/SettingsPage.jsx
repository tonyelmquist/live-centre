import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RaisedButton, Toggle } from 'material-ui';
import { changeLang, changeAudioLang, changeSubtitleLang, toggleRecommendations, saveUserSettings } from '../../actions/settings';
import FontAwesome from 'react-fontawesome';

class SettingsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            snackbarIsOpen: false,
            ageRating: '4',
            parentalCode: '1234',
            devices: ['Ronjas Huawei', 'Tonys Macbook Pro', 'Dans PS4'],
        };
    }

    handleAudioChange = event => this.props.dispatch(changeAudioLang(event.target.value));
    handleSubtitleChange = event => this.props.dispatch(changeSubtitleLang(event.target.value));
    handleRecommendationsChange = () => this.props.dispatch(toggleRecommendations());
    handleAgeRatingChange = event => this.setState({ ageRating: event.target.value })

    handleSaveTouch = () => {
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

    removeFromDevices(id) {
        console.log('remove id', id);

        this.setState((state) => {
            console.log(state);
            return { devices: [...state.devices.slice(0, id), ...state.devices.slice(id + 1)] };
        });
    }


    getFormList = () => {
        let formList = (<li />);
        if (this.state.devices.length > 0) {
            const closeBtn = id => (
          <FontAwesome
            className="formListcloseBtn"
            name="times"
            onTouchTap={() => { this.removeFromDevices(id); }}
          />);

            formList = this.state.devices.map((device, key) =>
            <li>{device} {closeBtn(key)} </li>,
          );
        } else {
            formList = (<li className="unactive">No devices active</li>);
        }
        return (<ul className="formList">{formList}</ul>);
    }

    render() {
        return (
          <div className="settingsPage container-fluid">
            <div className="section">
              <h3>{i18next.t('setting_language_options')}</h3>

              <label htmlFor="settings_audio">{i18next.t('setting_audio')}</label>
              <select
                value={this.props.settings.options.audioLanguage}
                onChange={this.handleAudioChange}
                id="settings_audio"
              >
                <option value={'en'}>{i18next.t('language_english')}</option>
                <option value={'nb'}>{i18next.t('language_norwegian')}</option>
              </select>

              <label htmlFor="settings_language">{i18next.t('setting_language')}</label>
              <select
                value={this.props.settings.options.language}
                onChange={this.handleLanguageChange}
                id="settings_language"
              >
                <option value={'en'}>{i18next.t('language_english')}</option>
                <option value={'nb'}>{i18next.t('language_norwegian')}</option>
              </select>

              <br />

              <label htmlFor="settings_subtitle">{i18next.t('setting_subtitle')}</label>
              <select
                value={this.props.settings.options.subtitleLanguage}
                onChange={this.handleSubtitleChange}
              >
                <option value={'en'}>{i18next.t('language_english')}</option>
                <option value={'nb'}>{i18next.t('language_norwegian')}</option>
              </select>
            </div>

            <div className="section">
              <h3>General Settings</h3>
              <Toggle
                label="Recommendations"
                toggled={this.props.settings.options.recommendations}
                onToggle={this.handleRecommendationsChange}
              />
            </div>

            <div className="section">
              <h3>Active Devices</h3>
              {this.getFormList()}
            </div>

            <div className="section">
              <h3>Parental Controls</h3>
              <label htmlFor="age_rating_setting">Age Rating</label>
              <select
                id="age_rating_setting"
                value={this.state.ageRating}
                onChange={this.handleAgeRatingChange}
              >
                <option value={'4'}>4+</option>
                <option value={'9'}>9+</option>
                <option value={'12'}>12+</option>
                <option value={'17'}>17+</option>
                <option value={'all'}>All</option>
              </select>

              <label htmlFor="parental_password">Parental Code</label>
              <input
                id="parental_password"
                type="password"
                value={this.state.parentalCode}
              />
            </div>
            <div className="section">
              <button onTouchTap={this.handleSaveTouch} className="formBtn halfBtn"> Save </button>
              <button className="formBtn secondaryBtn halfBtn"> Cancel </button>
              {/* <RaisedButton label="Save" primary onTouchTap={this.handleSaveTouch} /> */}
            </div>
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
