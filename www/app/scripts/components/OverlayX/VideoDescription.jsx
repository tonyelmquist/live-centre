import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import FullStar from 'material-ui/svg-icons/toggle/star';
import { yellow500 } from 'material-ui/styles/colors';
import Collapsible from '../Common/Collapsible';

class VideoDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlisted: this.props.video.wishlist,
        };
    }

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
        if (this.state.wishlisted) {
            return;
        }
        this.props.handleAddToWishlist();
        this.setState({ wishlisted: true });
    }

    title = this.props.video.series ? this.props.video.series : this.props.video.title;
    subtitle = this.props.video.series ? `${this.props.video.title}, season ${this.props.video.season}` : null;

    componentWillUpdate = (nextProps) => {
        if (this.state.wishlisted !== nextProps.video.wishlist) {
            this.setState({ wishlisted: nextProps.video.wishlist });
        }
    }
    ipsum = `Morbi eu scelerisque justo. Sed finibus, tortor eu viverra fringilla,
    lectus sem condimentum mi, tempus tincidunt mauris dolor tempor
    nibh. Vestibulum quis convallis urna. Mauris massa lectus,
    convallis in mi id, blandit suscipit turpis. Integer egestas
    risus sodales dui euismod, quis auctor ex tincidunt. `;

    render() {
        console.log('VideoDescription Rerender', this.props.video);
        return (
        <Collapsible
          label={this.props.video.series ? this.props.video.series : this.props.video.title}
          collapseInfo={this.collapseInfo}
          toggleCollapseInfo={this.props.toggleCollapseInfo}
          isCollapsed={this.props.isCollapsed}
        >
            <p>{this.subtitle ? this.subtitle : ''}
                Duration: {Math.round(45)} min <br />
                Star Rating: {this.renderStars()} <br />
                Add to Watchlist <FontAwesome name={this.state.wishlisted ? 'heart' : 'heart-o'} onClick={this.handleWishlistClick} style={{ color: 'white' }} />
            </p>

          <p>{this.ipsum}</p>
        </Collapsible>
        );
    }
}

VideoDescription.defaultProps = {
    handleAddToWishlist: () => {},
};

VideoDescription.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    handleAddToWishlist: PropTypes.func,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
