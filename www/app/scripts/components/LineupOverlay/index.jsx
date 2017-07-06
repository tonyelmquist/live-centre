import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineupShirt from './LineupShirt';

class LineupOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTeam: 1,
        };

        this.toTeam1 = this.toTeam1.bind(this);
        this.toTeam2 = this.toTeam2.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teamToDisplay === 1) {
            this.toTeam1();
        }
        if (nextProps.teamToDisplay === 2) {
            this.toTeam2();
        }
    }

    toTeam1() {
        this.setState({ openTeam: 1 });
    }

    toTeam2() {
        this.setState({ openTeam: 2 });
    }

    render() {
        return (
          <div className={`lineup-overlay ${this.props.hidden ? 'hidden-up' : ''}`}>
            <div className="football-field-outline" />
            <div className="counter-skew">
              {/* Team Colours*/}
              <div className={`team1-colors ${this.state.openTeam === 1 ? '' : 'faded'}`} onClick={this.toTeam1} role="button" tabIndex="0" />
              <div className={`team2-colors ${this.state.openTeam === 2 ? '' : 'faded'}`} onClick={this.toTeam2} role="button" tabIndex="0" />

              {/* Team Names*/}
              <div className={`team1-name ${this.state.openTeam === 1 ? '' : 'faded'}`} onClick={this.toTeam1} role="button" tabIndex="0">Real Madrid</div>
              <div className={`team2-name ${this.state.openTeam === 2 ? '' : 'faded'}`} onClick={this.toTeam2} role="button" tabIndex="0">Barcelona</div>

              {/* Line up*/}
              <div className={`team1-lineup ${this.state.openTeam === 1 ? '' : 'transparent'}`}>
                <LineupShirt colorLeft="rgb(250, 250, 250)" colorRight="rgb(240, 240, 240)" colorDarker="black" textColor="black" number="1" position="GK" onClick={this.props.onIconClick} />
              </div>
              <div className={`team2-lineup ${this.state.openTeam === 2 ? '' : 'transparent'}`}>
                <LineupShirt colorLeft="#003175" colorRight="#850D37" colorDarker="black" number="12" position="GK2" onClick={this.props.onIconClick} />
              </div>
            </div>

            <div className="close-btn" onClick={this.props.onClose} role="button" tabIndex="0">X</div>
          </div>
        );
    }
}

LineupOverlay.defaultProps = {
    teamToDisplay: 1,
    hidden: true,
};

LineupOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    onIconClick: PropTypes.func.isRequired,
    teamToDisplay: PropTypes.number,
    hidden: PropTypes.bool,
};

export default LineupOverlay;
