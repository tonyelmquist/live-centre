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
    const _this = this;
    const config = {
      searchTerm: 'Lost',
      url: 'https://api-eu1.mediabank.me/mediabank/asset/'
    };

    this.serverRequest = 
      axios({
        method: 'get',
        // url: config.url + '{"query_string":"' + config.searchTerm + '"}', //TODO: pass in query string
        url: `${config.url}{"query_string":"${config.searchTerm}"}`,
        headers: {
          'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
        }, 
        auth: {
          username: 'api',
          password: 'tv$&?QkD=8GBpvKD'
        }
        })
        .then( (result) => {  
          const filteredAssets = result.data.assets.filter( (asset)=> {
            return asset.metadata.MimeType === 'video';
          });  
          _this.setState({
            assets: filteredAssets
          });
        });
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
          actionIcon={<IconButton><PlayCircleOutline color="white" /></IconButton>}>
          <img src={thumb.metadata.PosterURL} />
        </GridTile>)
      )}
    </GridList>
    
  </div>);
  }
}