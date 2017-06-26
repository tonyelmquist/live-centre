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
const imagePathPrefix = "http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/images/";

class CategoryItem extends Component {
    _handlePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/video-files/${videoUrl}`));
    }

    render() {



        return (
            <div className="videoThumb">
                <GridTile
                    //onTouchTap={this.props.handleClick}
                    title={this.props.video.title}
                    //subtitle={< span > by < b > {this.props.video.author} </b></span >}
                    subtitle={this.props.video.description}
                    actionIcon={<div>
                        <IconButton iconStyle={styles.mediumIcon}  style={styles.medium} onTouchTap = {() => {this.props.handleClick();}} >
                            <Info hoverColor={amber300} color={fullWhite}/>
                        </IconButton>
                        <IconButton iconStyle={styles.mediumIcon}  style={styles.medium} onTouchTap = {() => {this._handlePlay(this.props.video.video_url);}} >
                            <PlayCircleOutline hoverColor={amber300} color={fullWhite}/>
                        </IconButton>
                    </div>}>
                    <img src={`${imagePathPrefix+this.props.video.thumbnail}`}/>
                </GridTile>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {videoUrl: state.playback.url, selected: state.playback.isSelected};
};

CategoryItem.propTypes = {
    dispatch: PropTypes.func,
    video: PropTypes.object,
    handleClick: PropTypes.func
};

export default connect(mapStateToProps)(CategoryItem);
