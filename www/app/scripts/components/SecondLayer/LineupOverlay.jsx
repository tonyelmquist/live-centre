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
        const teamOneColors = [];
        const teamTwoColors = [];

        teamOneColors[0] = this.props.teamOneData.colors[0] ? this.props.teamOneData.colors[0] : 'white';
        teamOneColors[1] = this.props.teamOneData.colors[1] ? this.props.teamOneData.colors[1] : this.props.teamOneData.colors[0];

        teamTwoColors[0] = this.props.teamTwoData.colors[0] ? this.props.teamTwoData.colors[0] : 'white';
        teamTwoColors[1] = this.props.teamTwoData.colors[1] ? this.props.teamTwoData.colors[1] : this.props.teamTwoData.colors[0];

        return (
          <div className={`lineup-overlay ${this.props.isShowing ? 'isShowing' : ''}`}>
            <div className="football-field-outline" />
            <div className="counter-skew">
              {/* Team Colours*/}
              <div className={`team1-colors ${this.state.openTeam === 1 ? '' : 'faded'}`} onClick={this.toTeam1} role="button" tabIndex="0" />
              <div className={`team2-colors ${this.state.openTeam === 2 ? '' : 'faded'}`} onClick={this.toTeam2} role="button" tabIndex="0" />

              {/* Team Names*/}
              <div className={`team1-name ${this.state.openTeam === 1 ? '' : 'faded'}`} onClick={this.toTeam1} role="button" tabIndex="0">{this.props.teamOneData.title}</div>
              <div className={`team2-name ${this.state.openTeam === 2 ? '' : 'faded'}`} onClick={this.toTeam2} role="button" tabIndex="0">{this.props.teamTwoData.title}</div>

              {/* Line up*/}
              <div className={`team1-lineup ${this.state.openTeam === 1 ? '' : 'transparent'}`}>
                {this.props.teamOneData.players.map((value) => {
                    return (<LineupShirt key={`team1-${value.number}`} clickIndicator={(value.number === 1)} colorLeft={teamOneColors[0]} colorRight={teamOneColors[1]} colorDarker="black" number={value.number} position={value.position} side="L" onClick={() => this.props.onIconClick(value)} />);
                })}
              </div>
              <div className={`team2-lineup ${this.state.openTeam === 2 ? '' : 'transparent'}`}>
                {this.props.teamTwoData.players.map(value =>
                    <LineupShirt key={`team2-${value.number}`} colorLeft={teamTwoColors[0]} colorRight={teamTwoColors[1]} colorDarker="black" number={value.number} position={value.position} side="R" onClick={() => this.props.onIconClick(value)} />,
                )}
              </div>
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
    teamOneData: PropTypes.object.isRequired,
    teamTwoData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onIconClick: PropTypes.func.isRequired,
    teamToDisplay: PropTypes.number,
    isShowing: PropTypes.bool,
};

export default LineupOverlay;
