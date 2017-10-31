import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineupShirt from './LineupShirt';

class LineupShirtManager extends Component {
    renderLineupShirt = (number, playerId) => {
        return <LineupShirt key={`team2-${number}`} text={this.props.jersey.number} base={this.props.jersey.base} sleeve={this.props.jersey.sleeve} number={number} onClick={() => this.props.onClick(playerId)}/>
    }

    render() {
        return (
            <div className={`team-lineup ${this.props.isOpen ? '' : 'transparent'} ${this.props.inverse ? 'inverse' : ''}`}>
                <div className="lineup-col goal">
                    {this.props.lineup.filter(value => value.position === 'Goalkeeper').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
                <div className="lineup-col back-defenders">
                    {this.props.lineup.filter(value => value.position === 'Left back').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                    {this.props.lineup.filter(value => value.position === 'Right back').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
                <div className="lineup-col defenders">
                    {this.props.lineup.filter(value => value.position === 'Central defender').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
                <div className="lineup-col midfield">
                    {this.props.lineup.filter(value => value.position === 'Central midfielder').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
                <div className="lineup-col wingers">
                    {this.props.lineup.filter(value => value.position === 'Left winger').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                    {this.props.lineup.filter(value => value.position === 'Right winger').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
                <div className="lineup-col striker">
                    {this.props.lineup.filter(value => value.position === 'Striker').map(value =>
                        this.renderLineupShirt(value.jersey_number, value.id.split('sr:player:')[1])
                    )}
                </div>
            </div>
        );
    }
}

LineupShirtManager.defaultProps = {
    inverse: false,
};

LineupShirtManager.propTypes = {
    lineup: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    inverse: PropTypes.bool,
};

export default LineupShirtManager;
