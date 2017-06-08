import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col} from 'react-flexbox-grid';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import Info from 'material-ui/svg-icons/action/info';
import {amber300, yellow500, blue500, fullWhite } from 'material-ui/styles/colors';
import {videoSelected, invalidateSelected} from '../actions/video';
import {showOverlay, hideOverlay} from '../actions/overlay';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36
    },
    medium: {
        width: 64,
        height: 64,
        padding: 8
    }
};

class Item extends Component {
    _handlePlay = (assetid) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    }

    render() {

        return (
            <div className="videoThumb">
                <GridTile
                    //onTouchTap={this.props.handleClick}
                    title={this.props.video.title}
                    subtitle={< span > by < b > {
                    this.props.video.author
                } </b></span >}
                    actionIcon={<div>
                        <IconButton iconStyle={styles.mediumIcon}  style={styles.medium} onTouchTap = {() => {this.props.handleClick();}} >
                            <Info hoverColor={amber300} color={fullWhite}/>
                        </IconButton>
                        <IconButton iconStyle={styles.mediumIcon}  style={styles.medium} onTouchTap = {() => {this._handlePlay(this.props.video.assetid);}} >
                            <PlayCircleOutline hoverColor={amber300} color={fullWhite}/>
                        </IconButton>
                    </div>}>
                    <img src={this.props.video.thumbnail}/>
                </GridTile>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {videoUrl: state.playback.url, selected: state.playback.isSelected};
};

Item.propTypes = {
    dispatch: PropTypes.func.isRequired,
    video :PropTypes.object,
    handleClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Item);
