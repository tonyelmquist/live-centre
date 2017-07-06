import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import VideoItem from '../../components/CategoryItem';

class VideoGrid extends Component {
    _renderVideos = () =>
        this.props.videos.map(video =>
          (<Col xs={6} sm={4} md={3} key={video.id}>
            <VideoItem video={video} handleClick={() => this.props.onSelect(video.videoUrl)} />
          </Col>),
        );

    render() {
        // console.log(this.props.videos);
        return (
          <Grid>
            <Row className="_grid">
              {this.props.videos ? this._renderVideos() : <div />}
            </Row>
          </Grid>
        );
    }
}

VideoGrid.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default VideoGrid;
