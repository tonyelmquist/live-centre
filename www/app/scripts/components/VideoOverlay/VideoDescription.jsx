import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import FullStar from 'material-ui/svg-icons/toggle/star';
import { yellow500 } from 'material-ui/styles/colors';
import Collapsible from '../Common/Collapsible';
import i18next from 'i18next';

class VideoDescription extends React.Component {

    starStyle = {
        verticalAlign: 'top',
        height: 20,
    }

    renderStars = () => (
          <span>
            <FullStar style={this.starStyle} color={yellow500} />
            <FullStar style={this.starStyle} color={yellow500} />
            <FullStar style={this.starStyle} color={yellow500} />
            <FullStar style={this.starStyle} color={yellow500} />
            <FullStar style={this.starStyle} color={yellow500} />
          </span>
        );

    handleWishlistClick = () => {
        if (this.props.video.wishlist) {
            this.props.handleRemoveFromWishlist(this.props.video.id);
        } else {
            this.props.handleAddToWishlist(this.props.video.id);
        }
    }

    title = this.props.video.series ? this.props.video.series : this.props.video.title;
    subtitle = this.props.video.series ? `${this.props.video.title}, season ${this.props.video.season}` : null;
    
    render() {
        return (
            <div className="ox-content-inner">
                <h3 style={{marginTop: 0}}><b>{this.props.video.series ? this.props.video.series : this.props.video.title}</b></h3>
                <p><b>{this.subtitle ? this.subtitle : ''}</b></p>
                <p style={{ lineHeight: 1.5 }}>
                    {i18next.t('video_duration')} {this.props.video.formattedDuration} <br />
                    {i18next.t('video_star_rating')} {this.renderStars()} <br />
                    {i18next.t('video_add_watchlist')} <FontAwesome name={this.props.video.wishlist ? 'heart' : 'heart-o'} onClick={this.handleWishlistClick} style={{ color: 'white' }} />
                </p>

                <Collapsible
                    collapseInfo={this.collapseInfo}
                    toggleCollapseInfo={this.props.toggleCollapseInfo}
                    isCollapsed={this.props.isCollapsed}
                    text={this.props.video.description}
                />
                {/* <p>{this.ipsum}</p>
                </Collapsible>  */}
            </div>
        );
    }
}

VideoDescription.defaultProps = {
    handleAddToWishlist: () => {},
};

VideoDescription.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    handleAddToWishlist: PropTypes.func,
    handleRemoveFromWishlist: PropTypes.func,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
