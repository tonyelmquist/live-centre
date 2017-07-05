import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScoreClock from './scoreClock.jsx';

class ScoreOverlay extends Component {

    render() {
        return (
            <div className='score-overlay-container'>
                <div className='counter-skew'>
                    <div className='team1-score'>
                        {this.props.score.team1Score}
                    </div>

                    <div className='team1-icon'>

                    </div>

                    <div className='team1-name' onClick={this.props.onTeamOneClick}>
                        RMA
                    </div>

                    <ScoreClock />

                    <div className='team2-name' onClick={this.props.onTeamTwoClick}>
                        FBC
                    </div>

                    <div className='team2-icon'>
                        
                    </div>

                    <div className='team2-score'>
                        {this.props.score.team2Score}
                    </div>
                </div>
            </div>
        );
    }
}

ScoreOverlay.propTypes = {

};

export default ScoreOverlay;