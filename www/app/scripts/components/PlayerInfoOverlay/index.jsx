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
        console.log('open');
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
        return (
          <div className={`player-info-overlay ${this.props.isShowing ? 'isShowing' : ''} ${this.state.isModalOpen ? 'isModalOpen' : ''}`}>
            <div className="player-icon">
              <img src="/img/soccer-players/ronaldo.png" alt="Ronaldo" />
            </div>
            <div className="player-info">
              <span className="player-info-name">Cristiano RONALDO</span>
              <span className="player-info-team">Real Madrid</span>
              <span className="player-info-position">Wide Forward</span>

              <span className="player-info-number">7</span>
              <div className="player-info-tabs">
                <div className="player-info-tab tab-player-info" onClick={this.openModal} role="button" tabIndex="0">U</div>
                <div className="player-info-tab tab-statistics" onClick={this.closeModal} role="button" tabIndex="0">C</div>
                <div className="player-info-tab tab-shopping">S</div>
              </div>
            </div>

            <div className="player-modal">
                    Info
                </div>

            <div className="close-btn" onClick={this.props.onClose} role="button" tabIndex="0">X</div>
            <div className="right-btn" onClick={this.props.onRightButton} role="button" tabIndex="0">R</div>
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
