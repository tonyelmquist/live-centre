import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerInfoOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            isModalOpen: true,
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
        });
    }

    getCurrentPlayerRole(roles) {
        console.log('ROLES', roles);
        const role = roles.filter(value => value.active === "true");
        console.log(role);
        if (role.length > 0) {
            return role[0].team.name + ' #' + role[0].jersey_number;
        } else {
            return 'Not Active';
        }
    }

    render() {
        let teamMember = {};

        if (this.props.player !== null) {
            teamMember = this.props.player;
        } else {
            return <div />;
        }

        return (
          <div className={`player-info-overlay ${this.props.isShowing ? 'isShowing' : ''} ${this.state.isModalOpen ? 'isModalOpen' : ''}`}>
            <div className="player-icon">
              <img src={`http://35.158.87.9/images/Sport/Players/${teamMember.name.replace(', ', '-')}.jpg`} alt="Ronaldo" />
            </div>
            <div className="player-info">
              <span className="player-info-name">{teamMember.name}</span>
              {teamMember.nationality ?
                <span className="player-info-team">
                  {this.getCurrentPlayerRole(teamMember.roles)}
                </span> :
              <div />}
              <span className="player-info-position" style={{ textTransform: 'capitalize' }}>{teamMember.type}</span>

              <span className="player-info-number">
                  <img src={`http://35.158.87.9/images/Flags/${teamMember.nationality.name}.png`} alt={teamMember.nationality.name} />
                </span>
              <div className="player-info-tabs">
                <div className="player-info-tab tab-player-info" onClick={this.state.isModalOpen ? this.closeModal : this.openModal} role="button" tabIndex="0"><i className="fa fa-pie-chart" /> Statistics</div>
                {/*<div className="player-info-tab tab-statistics" onClick={this.closeModal} role="button" tabIndex="0"><i className="fa fa-bar-chart" /></div>*/}
                {/*<div className="player-info-tab tab-shopping"><i className="fa fa-shopping-cart" /></div>*/}
              </div>
            </div>

            {teamMember.statistics ?
                (<div className="player-modal">
                    {/*<div className="player-stats player-assists">{teamMember.statistics.assists}</div>*/}
                    <div className="player-stats player-matches_played">Games: {teamMember.statistics.matches_played}</div>
                    <div className="player-stats player-goals_scored">Goals: {teamMember.statistics.goals_scored}</div>
                    {/*<div className="player-stats player-own_goals">{teamMember.statistics.own_goals}</div>*/}
                    <div className="player-stats player-red_cards">{teamMember.statistics.red_cards} Red Cards</div>
                    {/*<div className="player-stats player-substituted_in">{teamMember.statistics.substituted_in}</div>*/}
                    {/*<div className="player-stats player-substituted_out">{teamMember.statistics.substituted_out}</div>*/}
                    <div className="player-stats player-yellow_cards">{teamMember.statistics.yellow_cards} Yellow Cards</div>
                    {/*<div className="player-stats player-yellow_red_cards">{teamMember.statistics.yellow_red_cards}</div>*/}
                </div>)
            : <div />}

            <div className="close-btn" onClick={this.props.onClose} role="button" tabIndex="0"><i className="fa fa-close" /></div>
            <div className="right-btn" onClick={this.props.onRightButton} role="button" tabIndex="0"><i className="fa fa-chevron-right" /></div>
          </div>
        );
    }
}

PlayerInfoOverlay.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    onRightButton: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PlayerInfoOverlay;
