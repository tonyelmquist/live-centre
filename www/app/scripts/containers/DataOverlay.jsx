import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { newPopNotification } from '../actions/notifications';
import { getMatchData } from '../utils/loadMatchData';

// Data Overlays
import SoccerDataOverlay from './DataOverlays/SoccerDataOverlay';
import BasketballDataOverlay from './DataOverlays/BasketballDataOverlay';
import ECommerceDataOverlay from './DataOverlays/EcommerceDataOverlay';
import PopIndicatorManager from '../components/SecondLayer/PopIndicatorManager';


class DataOverlay extends Component {
    constructor(props) {
        super(props);

        window.addEventListener('keydown', (e) => {
            console.log(e.keyCode);

            if (e.shiftKey && e.keyCode === 81) {
                console.log('notification');
                this.props.dispatch(newPopNotification(Math.round(Math.random() * 100), 'data.message', 2, new Date().getTime()));
            }
        });
    }


    render() {
        return (
            <div className="data-overlay" onTouchTap={e => e.stopPropagation()}>

                {this.props.selectedVideo.sport === 'Soccer' ?
                    <SoccerDataOverlay /> : ''
                }
                {this.props.selectedVideo.sport === 'Basketball' ?
                    <BasketballDataOverlay /> : ''
                }
                <ECommerceDataOverlay />
                <PopIndicatorManager notifications={this.props.popNotifications} />

            </div>
        );
    }
}

DataOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sportsInfo: PropTypes.object.isRequired,
    selectedVideo: PropTypes.object.isRequired,
    popNotifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    sportsInfo: state.sportsInfo,
    selectedVideo: state.playback.video,
    products: state.ecommerce.products,
    ecommercePopupManager: state.ecommerce.popupManager,
    selectedProduct: state.ecommerce.selectedProduct,
    popNotifications: state.notifications.popNotifications,
});

export default connect(mapStateToProps)(DataOverlay);
