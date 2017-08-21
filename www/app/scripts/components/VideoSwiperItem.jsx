import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui/GridList';
import LiveTag from './common/LiveTag';
import NewTag from './common/NewTag';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36,
    },
    medium: {
        width: 64,
        height: 64,
        padding: 8,
    },
};

class VideoSwiperItem extends Component {
    render() {
        return (
          <div className="videoThumb">
            <GridTile
              title={''}
              subtitle={''}
              onTouchTap={() => { this.props.handleClick(); }}
              actionIcon={<div />}
            >
              <img src={this.props.video.thumbnail} alt={this.props.video.description} />
            </GridTile>
            {this.props.video.tags === 'Street Fighter' ? <LiveTag /> : ''}
            {this.props.video.id === 238449001 ? <NewTag /> : ''}
            {this.props.video.id === 221459001 ? <NewTag /> : ''}
          </div>
        );
    }
}

VideoSwiperItem.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default VideoSwiperItem;
