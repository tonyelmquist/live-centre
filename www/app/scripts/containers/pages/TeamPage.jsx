import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterTabs from '../../components/HorizontalScroll/FilterTabs';
import TeamInfoSection from '../../components/SportSection/TeamInfoSection';
import SportPlayerOverlay from '../../components/SportSection/SportPlayerOverlay';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';
import { changeTeamTabIndex, openTeamMemberOverlay } from '../../actions/pages/sportsPage';

import picture1 from '../../../img/mockup/sport/soccer-background-1.jpg';
import picture2 from '../../../img/mockup/sport/soccer-background-2.jpg';

const tabs = [
    'Info',
    'Games',
    'Highlights',
];

class TeamPage extends React.Component {
    changeRoute = path => this.props.history.push(path);

    changeTab = (index) => {
        this.props.dispatch(changeTeamTabIndex(index));
    }
    getVideoTiles = (activeTab) => {
        const img = activeTab == 1 ? picture1 : picture2;
        const tiles = [];
        for (let i = 0; i < 10; i++) {
            tiles.push(
        <MasonryImageTile
          key={`sport-video-${i}`}
          poster={img}
          // overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTilePlay} title={video.title}/>}
        />,
      );
        }
        return tiles;
    }
    openPlayerOverlay = (player) => {
      console.log("open player overlay", player);
      this.props.dispatch(openTeamMemberOverlay(player));
    }

    render() {
        const teamKey = this.props.match.params.teamKey;
        const team = this.props.team[teamKey];
        const activeTab = this.props.sportsPage.activeTeamTab;
        const activePlayerTab = this.props.sportsPage.activePlayerTab;
        const activePlayer = this.props.sportsPage.activePlayer;
        const players = this.props.team[teamKey].players;

        return (
          <div>
            
            <FilterTabs
              tabItems={tabs}
              activeTab={activeTab}
              changeTab={this.changeTab}
              colortheme="dark wide"
            />
              {
                activeTab == 0
                ? <TeamInfoSection players={players} team={team} openPlayerOverlay={this.openPlayerOverlay} closePlayerOverlay={this.closePlayerOverlay}/>
                : <div className="container-fluid"><MasonryContainer>{this.getVideoTiles(activeTab)}</MasonryContainer></div>
              }

          </div>
        );
    }
}

TeamPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
    sportsPage: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos,
    tags: state.tags.items,
    sportsPage: state.sportsPage,
    team: state.sportsInfo.teams,
    //players: state.sportsInfo.players,
});

export default connect(mapStateToProps)(TeamPage);
