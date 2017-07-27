import React from 'react';
import CirclesRow from '../../components/horizontal-scroll/CirclesRow';
import CircleRowItem from '../../components/horizontal-scroll/CircleRowItem';
import FilterTabs from '../../components/horizontal-scroll/FilterTabs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import TeamInfoSection from '../../components/sportSection/TeamInfoSection';
import SportPlayerOverlay from '../../components/sportSection/SportPlayerOverlay';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import { changeTeamTabIndex, openSportPlayerOverlay, closeSportPlayerOverlay } from '../../actions/SportsPage';

const tabs = [
    'Info',
    'Games',
    'Highlights',
];

class SportsTeamPage extends React.Component {
    changeRoute = path => this.props.history.push(path);

    changeTab = (index) => {
        this.props.dispatch(changeTeamTabIndex(index));
    }
    getVideoTiles = (activeTab) => {
        const tiles = [];
        for (let i = 0; i < 10; i++) {
            tiles.push(
        <MasonryImageTile
          key={`sport-video-${i}`}
          poster={`img/soccer-background-${activeTab}.jpg`}
          // overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTilePlay} title={video.title}/>}
        />,
      );
        }
        return tiles;
    }
    openPlayerOverlay = (player) => {
      console.log("open player overlay", player);
      this.props.dispatch(openSportPlayerOverlay(player));
    }
    closePlayerOverlay = () => {
      console.log("Close");
      this.props.dispatch(closeSportPlayerOverlay());
    }
    render() {
        const teamKey = this.props.match.params.teamKey;
        const team = this.props.team[teamKey];
        const activeTab = this.props.sportsPage.activeTeamTab;
        const activePlayerTab = this.props.sportsPage.activePlayerTab;
        const activePlayer = this.props.sportsPage.activePlayer;
        const players = this.props.players;
        const playerOverlay = this.props.sportsPage.sportPlayerOverlay;

        return (
          <div>
            {playerOverlay.isOpen ? <SportPlayerOverlay closePlayerOverlay={this.closePlayerOverlay} player={playerOverlay.player} /> : <div />}
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

SportsTeamPage.propTypes = {
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
    players: state.sportsInfo.players,
});

export default connect(mapStateToProps)(SportsTeamPage);
