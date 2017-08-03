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
        const teamOneColors = [];
        const teamTwoColors = [];

        teamOneColors[0] = this.props.teamOneData.colors[0] ? this.props.teamOneData.colors[0] : 'white';
        teamOneColors[1] = this.props.teamOneData.colors[1] ? this.props.teamOneData.colors[1] : this.props.teamOneData.colors[0];

        teamTwoColors[0] = this.props.teamTwoData.colors[0] ? this.props.teamTwoData.colors[0] : 'white';
        teamTwoColors[1] = this.props.teamTwoData.colors[1] ? this.props.teamTwoData.colors[1] : this.props.teamTwoData.colors[0];

        return (
          <div className="score-overlay-container">
            <div className="counter-skew">
              <div className="team1-score">
                {this.props.score.team1Score}
              </div>

              <div className="team1-icon">
                <div className="team-icon-upper" style={{ background: teamOneColors[0] }} />
                <div className="team-icon-lower" style={{ background: teamOneColors[1] }} />
              </div>

              {this.state.clicked ? <div /> : <div className="click-indicator-text" />}

              <div className="team1-name" onClick={this.onTeamOneClick} role="button" tabIndex="0">
                  {this.props.teamOneData.abbr}
              </div>

              <ScoreClock />

              <div className="team2-name" onClick={this.props.onTeamTwoClick} role="button" tabIndex="0">
                  {this.props.teamTwoData.abbr}
              </div>

              <div className="team2-icon">
                <div className="team-icon-upper" style={{ background: teamTwoColors[0] }} />
                <div className="team-icon-lower" style={{ background: teamTwoColors[1] }} />
              </div>

              <div className="team2-score">
                {this.props.score.team2Score}
              </div>
            </div>
          </div>
        );
    }
}

ScoreOverlay.propTypes = {
    teamOneData: PropTypes.object.isRequired,
    teamTwoData: PropTypes.object.isRequired,
    onTeamOneClick: PropTypes.func.isRequired,
    onTeamTwoClick: PropTypes.func.isRequired,
    score: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScoreOverlay;
