import React from 'react';
import {RaisedButton, SelectField, MenuItem} from 'material-ui';
import {changeLang} from '../../actions/settings';
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

    state = {
        audio: 2
    }

    // handleLang = (newLang) => {
    //     if (newLang !== this.props.lang ){
    //         i18next.changeLanguage(newLang, (err, t)=> {
    //             this.props.dispatch(changeLang(newLang));
    //         });
    //     }
    // }

    handleAudioChange = (event, index, value) => this.setState({
        audio: value
    })

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
            {/*<ul>
                <li>
                    {i18next.t('topics_rendering')};
                </li>
                <li>
                    {i18next.t('topics_component')};
                </li>
                <li>
                    {i18next.t('topics_state')};
                </li>

            </ul>*/}

            <h3>{i18next.t('setting_language_options')}</h3>
            <SelectField
              floatingLabelText={i18next.t('setting_audio')}
              value={this.props.settings.audioLang}
              onChange={this.handleAudioChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            {/*<RaisedButton id="btn_eng" label="ENG" primary={true} onTouchTap={() => {this.handleLang('en');}}/>
            <RaisedButton id="btn_nor" label="NO" primary={true} onTouchTap={() => {this.handleLang('nb');}}/>*/}
            <SelectField
              floatingLabelText={i18next.t('setting_language')}
              value={this.props.settings.lang}
              onChange={this.handleLanguageChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>

            <br />

            <SelectField
              floatingLabelText={i18next.t('setting_subtitle')}
              value={this.props.settings.subtitleLang}
              onChange={this.handleLanguageChange} >
                <MenuItem value={"en"} primaryText={i18next.t('language_english')} />
                <MenuItem value={"nb"} primaryText={i18next.t('language_norwegian')} />
            </SelectField>
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
