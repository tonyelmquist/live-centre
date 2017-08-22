import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';
import MasonryTextOverlay from '../../components/Masonry/MasonryTextOverlay';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../../components/HorizontalScroll/CircleRowItem';
import LiveTag from '../../components/common/LiveTag';
import soccerBG from '../../../img/mockup/sport/soccer-background.jpg';
import i18next from 'i18next';
import { videoSelected, resetCurrentTimeInPlayer } from '../../actions/videoPlayer';
import { maximizeOverlayX, openOverlayX } from '../../actions/overlayX';

import ChannelIcon from '../../components/HorizontalScroll/ChannelIcon';

class SingelSportsPage extends React.Component {

    
    handleTileOpen = (video) => {
        console.log("play video");
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }


    changeRoute = path => this.props.history.push(path);

    getTiles = (sportKey) => {
        const tiles = [];
        let videos = this.props.sportsInfo.sports[sportKey].videoItems;
        videos = videos.reverse();

        for (const key in videos) {
            tiles.push(
                <MasonryImageTile
                key={`sport-video-${key}`}
                poster={videos[key].thumbnail}
                //overlay={<LiveTag />}
                overlay={<MasonryTextOverlay video={videos[key]} handleTilePlay={this.handleTileOpen} title={videos[key].title} />}
                />,
            );
        }
        return tiles;
    }


    handleTeamOpen = (teamKey) => {
        this.changeRoute(`/team/${teamKey}`);
    }

    getTeams = () => {
        const teams = this.props.sportsInfo.teams;
        const rowItems = [];
        for (const key in teams) {
            console.log(teams, key);
            // rowItems.push(<CircleRowItem
            // key={key}
            // img={teams[key].logo}
            // handleClick={() => this.handleTeamOpen(key)}
            // />);
            rowItems.push(<div className="scrollable-team-logo"><img src={teams[key].logo}/></div>)
        }
        return rowItems;
    }
    render() {
        const sportKey = this.props.match.params.sportKey;

        if (typeof this.props.sportsInfo.sports[sportKey].videoItems === undefined) {
            return (<div> undefined </div>);
        }
        return (
            <div>
                <div className="container-fluid">
                <h4>{i18next.t('sport_teams')}</h4>
                </div>
                <HorizontalScrollContainer>
                    {this.getTeams()}
                </HorizontalScrollContainer>
                <br />
                <div className="container-fluid">
                <MasonryContainer>
                    {this.getTiles(sportKey)}
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
