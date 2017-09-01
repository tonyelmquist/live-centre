import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineupShirt from './LineupShirt';

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
              <div className={`team1-lineup ${this.state.openTeam === 1 ? '' : 'transparent'}`}>
                {this.props.homeData.starting_lineup.map(value => 
                    <LineupShirt key={`team1-${value.jersey_number}`} clickIndicator={(value.jersey_number === 1)} text={this.props.homeData.jersey.number} base={this.props.homeData.jersey.base} sleeve={this.props.homeData.jersey.sleeve} number={value.jersey_number} position={value.position} side="L" onClick={() => this.props.onIconClick(value.id.split('sr:player:')[1])} />)
                }
              </div>
              <div className={`team2-lineup ${this.state.openTeam === 2 ? '' : 'transparent'}`}>
                {this.props.awayData.starting_lineup.map(value =>
                    <LineupShirt key={`team2-${value.jersey_number}`} text={this.props.awayData.jersey.number} base={this.props.awayData.jersey.base} sleeve={this.props.awayData.jersey.sleeve} number={value.jersey_number} position={value.position} side="R" onClick={() => this.props.onIconClick(value.id.split('sr:player:')[1])} />,
                )}
              </div>
            </div>

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
