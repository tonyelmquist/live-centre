import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import { GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import {videoSelected, invalidateSelected} from '../actions/video';

class Item extends Component {

    handlePlay = (assetid) => {
        this
            .props
            .dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    }
	render () {

		return (
        <Col xs={12} sm={6} md={3} key={this.props.video.assetid}>
                <div className="videoThumb">
                    <GridTile
                        title={this.props.video.title}
                        subtitle={<span>by <b>{this.props.video.author}</b></span>}
                        actionIcon={<IconButton onTouchTap={() => {this.handlePlay(this.props.video.assetid);} }><PlayCircleOutline color="white" /></IconButton>}>
                        <img src={this.props.video.thumbnail} />
                    </GridTile>
                </div>
          </Col>
		);
	}
};

const mapStateToProps = (state) => {
    return {videoUrl: state.playback.url, selected: state.playback.isSelected};
};

export default connect(mapStateToProps)(Item);