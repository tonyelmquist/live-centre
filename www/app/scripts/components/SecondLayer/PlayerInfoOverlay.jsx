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

    render() {
        let teamMember = {};

        if (this.props.player !== null) {
            teamMember = this.props.player;
        }
        return (
          <div className={`player-info-overlay ${this.props.isShowing ? 'isShowing' : ''} ${this.state.isModalOpen ? 'isModalOpen' : ''}`}>
            <div className="player-icon">
              <img src={teamMember.portrait} alt="Ronaldo" />
            </div>
            <div className="player-info">
              <span className="player-info-name">{teamMember.name}</span>
              <span className="player-info-team">Real Madrid</span>
              <span className="player-info-position">{teamMember.position}</span>

              <span className="player-info-number">{teamMember.number}</span>
              <div className="player-info-tabs">
                <div className="player-info-tab tab-player-info" onClick={this.openModal} role="button" tabIndex="0"><i className="fa fa-user" /></div>
                <div className="player-info-tab tab-statistics" onClick={this.closeModal} role="button" tabIndex="0"><i className="fa fa-bar-chart" /></div>
                <div className="player-info-tab tab-shopping"><i className="fa fa-shopping-cart" /></div>
              </div>
            </div>

            <div className="player-modal">
                {teamMember.description}
            </div>

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
    player: PropTypes.object.isRequired,
};

export default PlayerInfoOverlay;
