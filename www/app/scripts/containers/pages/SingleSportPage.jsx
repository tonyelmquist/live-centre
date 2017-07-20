import React, {component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/common/MasonryContainer';
import MasonryImageTile from '../../components/common/MasonryImageTile';
import MasonryTextOverlay from '../../components/common/MasonryTextOverlay';
import CirclesRow from '../../components/common/CirclesRow';
import CircleRowItem from '../../components/common/CircleRowItem';


class SingelSportsPage extends React.Component {
  
  handleTilePlay = () => {
    console.log("PLAY VIDEO");
  }

  handleTileOpen = () => {
    console.log("tile open");
  }

  //!! Uses tags as channels since we have no channels per now. 
//   getTiles = () => {
//     const channelKey = this.props.match.params.channelKey;
//     const tiles = [];
//     const channelVideos = this.props.tags[channelKey].videos;
//     const videos = this.props.videos.items;
//     console.log("ALL VIDEOS", videos);

//     console.log(channelVideos);
      
//       for(const key in channelVideos){
//         const videoKey = channelVideos[key];
//         const video = videos[videoKey];

//         tiles.push(
//           <MasonryImageTile
//             key={`single-channel-video-${videoKey}`}
//             poster={video.thumbnail}
//             overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTilePlay} title={video.title}/>}
//           />
//         );
//       }
    

    
//     return tiles;
//   }

    getTeamFilters = () => {
        console.log(this.props.sportsInfo.teams);
        const teams = this.props.sportsInfo.teams;
        for(const key in teams){
            <CircleRowItem
                item={teams[key]}
                overlay={(<div>TEAM</div>)}
            />
            
        }
    }

  render(){
    console.log(this.props.match.params);
    const channelKey = this.props.match.params.channelKey;
    
    return (
      <div>
        <div className="container-fluid">
          <h4>{i18next.t('filter')}</h4>
        </div>
        <CirclesRow>
            {this.getTeamFilters()}
        </CirclesRow>
        <div className="container-fluid">
          <h4> LIVE Now </h4>
         {/* <MasonryContainer>
            {this.props.videos.videosFetched > 0 
              ? this.getTiles() 
              : <div/>
            }
         </MasonryContainer> */}
         </div>
      </div>
    );
  }

}

SingelSportsPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
    sportsInfo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos,
    tags: state.tags.items,
    sportsInfo: state.sportsInfo,
});

export default connect(mapStateToProps)(SingelSportsPage);
