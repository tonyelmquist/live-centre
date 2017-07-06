import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Col } from 'react-flexbox-grid';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import Info from 'material-ui/svg-icons/action/info';
import { amber300, fullWhite } from 'material-ui/styles/colors';
// import { yellow500, blue500, } from 'material-ui/styles/colors';
import { videoSelected } from '../actions/video';
import { showOverlay } from '../actions/overlay';

import videoPrefix from '../constants/mediaPrefix';

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

class CategoryItem extends Component {

    _handlePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }

    render() {
        return (
          <div className="videoThumb">
            <GridTile
                    // onTouchTap={this.props.handleClick}
              title={this.props.video.title}
                    // subtitle={< span > by < b > {this.props.video.author} </b></span >}
              subtitle={this.props.video.description}
              actionIcon={<div>
                <IconButton iconStyle={styles.mediumIcon} style={styles.medium} onTouchTap={() => { this.props.handleClick(); }} >
                  <Info hoverColor={amber300} color={fullWhite} />
                </IconButton>
                <IconButton iconStyle={styles.mediumIcon} style={styles.medium} onTouchTap={() => { this._handlePlay(this.props.video.videoUrl); }} >
                  <PlayCircleOutline hoverColor={amber300} color={fullWhite} />
                </IconButton>
              </div>}
            >
              <img src={this.props.video.thumbnail} alt={this.props.video.description} />
            </GridTile>
          </div>
        );
    }
}

const mapStateToProps = state => ({ videoUrl: state.playback.url, selected: state.playback.isSelected });

CategoryItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CategoryItem);
