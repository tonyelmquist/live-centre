import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineupShirt from './LineupShirt';
import LineupShirtManager from './LineupShirtManager';

class LineupOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTeam: 1,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.teamToDisplay === 1) {
            this.toTeam1();
        }
        if (nextProps.teamToDisplay === 2) {
            this.toTeam2();
        }
    }

    toTeam1 = () => {
        this.setState({ openTeam: 1 });
    }

    toTeam2 = () => {
        this.setState({ openTeam: 2 });
    }

    render() {
        if (
            typeof this.props.homeData.starting_lineup === 'undefined' ||
            typeof this.props.awayData.starting_lineup === 'undefined'
        ) {
            return (<div className={`lineup-overlay ${this.props.isShowing ? 'isShowing' : ''}`}>
                <div className="close-btn" onClick={this.props.onClose} role="button" tabIndex="0"><i className="fa fa-close" /></div>
                <p>We do not have any lineup data for this match.</p>
            </div>);
        }
        return (
          <div className={`lineup-overlay ${this.props.isShowing ? 'isShowing' : ''}`}>
            <div className="football-field-outline" />
            <div className="counter-skew">
              {/* Team Colours*/}
              <div className={`team1-colors ${this.state.openTeam === 1 ? '' : 'faded'}`}>
                <div className="color-1" style={{ background: `#${this.props.homeData.jersey.base}` }} />
                <div className="color-2" style={{ background: `#${this.props.homeData.jersey.sleeve}` }} />
              </div>
              <div className={`team2-colors ${this.state.openTeam === 2 ? '' : 'faded'}`}>
                <div className="color-1" style={{ background: `#${this.props.awayData.jersey.base}` }} />
                <div className="color-2" style={{ background: `#${this.props.awayData.jersey.sleeve}` }} />
              </div>

              {/* Team Names*/}
              <div className={`team1-name ${this.state.openTeam === 1 ? '' : 'faded'}`} onClick={this.toTeam1} role="button" tabIndex="0">{this.props.homeData.name}</div>
              <div className={`team2-name ${this.state.openTeam === 2 ? '' : 'faded'}`} onClick={this.toTeam2} role="button" tabIndex="0">{this.props.awayData.name}</div>

              {/* Line up*/}
              <LineupShirtManager lineup={this.props.homeData.starting_lineup} jersey={this.props.homeData.jersey} isOpen={this.state.openTeam === 1} onClick={this.props.onIconClick} />
              <LineupShirtManager lineup={this.props.awayData.starting_lineup} jersey={this.props.awayData.jersey} isOpen={this.state.openTeam === 2} inverse onClick={this.props.onIconClick} />

            </div>

            <div className="close-btn" onClick={this.props.onClose} role="button" tabIndex="0"><i className="fa fa-close" /></div>

          </div>
        );
    }
}

LineupOverlay.defaultProps = {
    teamToDisplay: 1,
    isShowing: false,
};

LineupOverlay.propTypes = {
    homeData: PropTypes.object.isRequired,
    awayData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onIconClick: PropTypes.func.isRequired,
    teamToDisplay: PropTypes.number,
    isShowing: PropTypes.bool,
};

export default LineupOverlay;
