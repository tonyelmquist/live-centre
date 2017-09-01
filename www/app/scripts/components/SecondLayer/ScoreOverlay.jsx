import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScoreClock from './scoreClock';

class ScoreOverlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
        };
    }

    onTeamOneClick = () => {
        this.props.onTeamOneClick();
        this.setState({
            clicked: true,
        });
    }

    render() {
        return (
          <div className="score-overlay-container">
            <div className="counter-skew">
              <div className="team1-score">
                0
              </div>

              <div className="team1-icon">
                <div className="team-icon-upper" style={{ background: `#${this.props.homeData.jersey.base || 'fff'}` }} />
                <div className="team-icon-lower" style={{ background: `#${this.props.homeData.jersey.sleeve || 'fff'}` }} />
              </div>

              {this.state.clicked ? <div /> : <div className="click-indicator-text" />}

              <div className="team1-name" onTouchTap={this.props.onHomeTeamClick} role="button" tabIndex="0">
                  {this.props.homeData.abbreviation || '...' }
              </div>

              <ScoreClock />

              <div className="team2-name" onTouchTap={this.props.onAwayTeamClick} role="button" tabIndex="0">
                  {this.props.awayData.abbreviation || '...'}
              </div>

              <div className="team2-icon">
                <div className="team-icon-upper" style={{ background: `#${this.props.awayData.jersey.base || 'fff'}` }} />
                <div className="team-icon-lower" style={{ background: `#${this.props.awayData.jersey.sleeve || 'fff'}` }} />
              </div>

              <div className="team2-score">
                0
              </div>
            </div>
          </div>
        );
    }
}

ScoreOverlay.propTypes = {
    homeData: PropTypes.object.isRequired,
    awayData: PropTypes.object.isRequired,
    onHomeTeamClick: PropTypes.func.isRequired,
    onAwayTeamClick: PropTypes.func.isRequired,
    score: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScoreOverlay;
