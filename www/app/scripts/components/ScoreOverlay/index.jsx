import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScoreClock from './scoreClock';

class ScoreOverlay extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
          <div className="score-overlay-container">
            <div className="counter-skew">
              <div className="team1-score">
                {this.props.score.team1Score}
              </div>

              <div className="team1-icon" />

              <div className="team1-name" onClick={this.props.onTeamOneClick} role="button" tabIndex="0">
                        RMA
                    </div>

              <ScoreClock />

              <div className="team2-name" onClick={this.props.onTeamTwoClick} role="button" tabIndex="0">
                        FBC
                    </div>

              <div className="team2-icon" />

              <div className="team2-score">
                {this.props.score.team2Score}
              </div>
            </div>
          </div>
        );
    }
}

ScoreOverlay.propTypes = {
    onTeamOneClick: PropTypes.func.isRequired,
    onTeamTwoClick: PropTypes.func.isRequired,
    score: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScoreOverlay;
