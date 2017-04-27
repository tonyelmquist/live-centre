import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Player from './Player';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import {videoSelected, invalidateSelected} from '../actions/video';
import {changeScore} from '../actions/score';

class HomeGrid extends React.Component {
    handlePlay = (assetid) => {
        this.props.dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    }

    createVideoList = () => {
        const videoList = this.props.videos || [];
        return this.props.videos.map((thumb) =>
            (<Col xs={12} sm={6} md={3} key={thumb.assetid}>
                <div className="videoThumb">
                    <GridTile
                        title={thumb.metadata.Title}
                        subtitle={<span>by <b>{thumb.metadata.UploadUserFullName}</b></span>}
                        actionIcon={<IconButton onTouchTap={() => {this.handlePlay(thumb.assetid);} }><PlayCircleOutline color="white" /></IconButton>}>
                        <img src={thumb.metadata.PosterURL} />
                    </GridTile>
                </div>
          </Col>)
        );
    }
  render() {

    return (
      <Grid fluid>        
        {this.props.selected && <Player videoUrl={this.props.videoUrl}/>}
        <Row>
          {this.createVideoList()}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        videoUrl: state.playback.url,
        selected: state.playback.isSelected
    };
};

export default connect(mapStateToProps)(HomeGrid);
