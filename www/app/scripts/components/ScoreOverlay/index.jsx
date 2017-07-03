import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ScoreOverlay extends Component {
    render() {
        return (
            <div className='score-overlay-container'>
                <div className='counter-skew'>
                    <div className='team1-score'>
                        0
                    </div>

                    <div className='team1-icon'>

                    </div>

                    <div className='team1-name'>
                        RMA
                    </div>

                    <div className='clock'>12:56</div>

                    <div className='team2-name'>
                        FBC
                    </div>

                    <div className='team2-icon'>
                        
                    </div>

                    <div className='team2-score'>
                        1
                    </div>
                </div>
            </div>
        );
    }
}

ScoreOverlay.propTypes = {

};

export default ScoreOverlay;