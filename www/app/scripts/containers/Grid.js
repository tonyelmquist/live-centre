import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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

    handleVideoFetch = (assetid) => {
        const config = {
          url: 'https://www.mediabank.me/ajax/get_assetinfo.php?application=library&assetid='
        };

        // store.dispatch(fetchMetadataSent());

        axios({
          method: 'get',
          url: `${config.url}${assetid}`,
          responseType: 'json',
          headers: {
            'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
          },
          auth: {
            username: 'api',
            password: 'tv$&?QkD=8GBpvKD'
          }
        })
        .then( (data) => {
            console.log(data);
        })
        .catch((data) => {
            console.log(data);
        });
    }

    createVideoList = () => {
        const videoList = this.props.videos || [];
        console.log(videoList);
        return this.props.videos.map((thumb) =>
            (<Col xs={12} sm={6} md={3} key={thumb.assetid}>
                <div className="videoThumb">
                    <GridTile
                        title={thumb.metadata.Title}
                        subtitle={<span>by <b>{thumb.metadata.UploadUserFullName}</b></span>}
                        actionIcon={<IconButton onTouchTap={() => {this.handleVideoFetch(thumb.assetid);} }><PlayCircleOutline color="white" /></IconButton>}>
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
        selected: state.playback.isSelected,
        fetching: state.playback.isFetching
    };
};

export default connect(mapStateToProps)(HomeGrid);
