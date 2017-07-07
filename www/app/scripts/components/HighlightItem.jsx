import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import Info from 'material-ui/svg-icons/action/info';
import { amber300, fullWhite } from 'material-ui/styles/colors';
import { goToTimestamp } from '../actions/video';
import { videoPrefix } from '../constants/mediaPrefix';

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

class HighlightItem extends Component {
    handlePlay = (timestamp) => {
        this.props.dispatch(goToTimestamp(timestamp));
    };

    render() {
        return (
          <div className="highlightsThumb">
            <GridTile
              title={this.props.title}
              subtitle={this.props.description}
              actionIcon={
                <div>
                  <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onTouchTap={() => {
                        this.props.handleClick();
                    }}
                  >
                    <Info hoverColor={amber300} color={fullWhite} />
                  </IconButton>
                  <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onTouchTap={() => {
                        this.handlePlay(this.props.timestamp);
                    }}
                  >
                    <PlayCircleOutline hoverColor={amber300} color={fullWhite} />
                  </IconButton>
                </div>
          }
            >
              <img alt={this.props.title} src={this.props.thumbnail} />
            </GridTile>
          </div>
        );
    }
}

HighlightItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
};

export default HighlightItem;
