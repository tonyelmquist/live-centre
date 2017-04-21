import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

export default class thumbnailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {assets: []};
  }

  componentDidMount() {
    var _this = this;
    var config = {

    };

    this.serverRequest = 
      axios({
        method: 'get',
        url: 'https://api-eu1.mediabank.me/mediabank/asset/{"query_string":"Lost"}', //TODO: pass in query string
        headers: {
          'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
        }, 
        auth: {
          username: 'api',
          password: 'tv$&?QkD=8GBpvKD'
        }
        })
        .then(function(result) {  
          var filteredAssets = result.data.assets.filter(function(asset){
            return asset.metadata.MimeType === 'video';
          })  
          _this.setState({
            assets: filteredAssets
          });
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  playVideo(videoID){
    
  }
  render() {
  return(
  <div style={styles.root}>
   
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {this.state.assets.map((thumb) =>
          (<GridTile
          key={thumb.assetid}
          title={thumb.metadata.Title}
          subtitle={<span>by <b>{thumb.metadata.UploadUserFullName}</b></span>}
          actionIcon={<IconButton onTouchTap={
        playVideo(thumb.assetid)}><PlayCircleOutline color="white" /></IconButton>}>
          <img src={thumb.metadata.PosterURL} />
        </GridTile>)
      )}
    </GridList>
    
  </div>)
  }
}