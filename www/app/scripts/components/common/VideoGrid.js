import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import VideoItem from '../../components/Item';


class VideoGrid extends Component {
    _renderVideos = () =>
        this.props.videos.map((video)=>{
            return (
                <Col xs={6} sm={4} md={3} key={video.assetid}>
                    <VideoItem video={video}
                        handleClick={()=> this.props.onSelect(video.assetid)}/>
                </Col>
            );


        });

    render() {
        //console.log(this.props.videos);
        return (
                <Grid 
                //fluid
                >
                    <Row className="_grid">
                        {this.props.videos
                        ? this._renderVideos()
                        : (<div></div>)}
                    </Row>
                </Grid>
        );
    };
};

VideoGrid.propTypes = {
    videos : PropTypes.array,
    onSelect: PropTypes.func.isRequired
};

export default VideoGrid;
