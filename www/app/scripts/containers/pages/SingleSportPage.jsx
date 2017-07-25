import React, {component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import MasonryTextOverlay from '../../components/masonry/MasonryTextOverlay';
import CirclesRow from '../../components/horizontal-scroll/CirclesRow';
import CircleRowItem from '../../components/horizontal-scroll/CircleRowItem';


class SingelSportsPage extends React.Component {
  
  handleTilePlay = () => {
    console.log("PLAY VIDEO");
  }

  handleTileOpen = () => {
    console.log("tile open");
  }

  changeRoute = path => this.props.history.push(path);

  getTiles = () => {
    const tiles = [];
    for(let i = 0; i<10; i++){
      tiles.push(
        <MasonryImageTile
          key={`sport-video-${i}`}
          poster={'/img/soccer-background.jpg'}
          //overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTilePlay} title={video.title}/>}
        />
      );
    }
    return tiles
  }

  handleTeamOpen = (teamKey) => {
      this.changeRoute(`/team/${teamKey}`);
  }

  getTeams = () => {
      const teams = this.props.sportsInfo.teams;
      const rowItems = [];
      for(const key in teams){
        for(let i = 0; i<10; i++){
          rowItems.push (<CircleRowItem
              key={key+i}
              img={teams[key].logo}
              handleClick={() => this.handleTeamOpen(key)}
          />);
        }
      }
      return rowItems
  }

  render(){
    const channelKey = this.props.match.params.channelKey;
    
    return (
      <div>
        <div className="container-fluid">        
          <h4>Teams</h4>
        </div>
        <CirclesRow>
            {this.getTeams()}
        </CirclesRow>
        <div className="container-fluid">
          <h4> LIVE Now </h4>
          <MasonryContainer>
            {this.getTiles()}
         </MasonryContainer>
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
