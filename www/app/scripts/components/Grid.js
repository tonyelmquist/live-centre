import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Player from './Player';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import {videoSelected} from '../actions/videoPlay';

class HomeGrid extends React.Component {
    handlePlay = (url) => {
        this.props.dispatch(videoSelected(url));
    }
    createVideoList = () => {
        const videoList = this.props.videos || [];
        return this.props.videos.map((thumb) =>
            (<Col xs={12} sm={6} md={3} key={thumb.assetid}>
                <div className="videoThumb">
                    <GridTile
                        title={thumb.metadata.Title}
                        subtitle={<span>by <b>{thumb.metadata.UploadUserFullName}</b></span>}
                        actionIcon={<IconButton onTouchTap={() => {this.handlePlay(thumb.metadata.HLSProxyURL);} }><PlayCircleOutline color="white" /></IconButton>}>
                        <img src={thumb.metadata.PosterURL} />
                    </GridTile>
                </div>
          </Col>)
        );
    }
  render() {
    // console.log(this.props.videos[0].HLSProxyURL);
    return (
      <Grid fluid>
        {this.props.selected && <Player />}
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
