import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col} from 'react-flexbox-grid';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import {videoSelected, invalidateSelected} from '../actions/video';

class Item extends Component {
    // _handleClick = () => {alert('Clicked');}
    _handlePlay = (assetid) => {
        this
            .props
            .dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    }
  
    render() {

        return (
            <div className="videoThumb">
                <GridTile
                    onTouchTap={this.props._handleClick}
                    title={this.props.video.title}
                    subtitle={< span > by < b > {
                    this.props.video.author
                } </b></span >}
                    actionIcon={< IconButton onTouchTap = {
                    () => {
                        this._handlePlay(this.props.video.assetid);
                    }
                } > <PlayCircleOutline color="white"/> </IconButton>}>
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
};

export default connect(mapStateToProps)(Item);
