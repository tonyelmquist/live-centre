import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';
import { videoSelected, resetCurrentTimeInPlayer } from '../../actions/videoPlayer';
import { changeProgramTabIndex } from '../../actions/pages/programsPage';
import { maximizeOverlayX, openOverlayX } from '../../actions/overlayX';
import FilterTabs from '../FilterTabs';

class WishlistPage extends React.Component {

    handleTileOpen = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }
    changeTab = (index) => {
        this.props.dispatch(changeProgramTabIndex(index));
    }

    // Must generate an object for the searchfilter box.
    tabs = (tabKeys) => {
        const activeIndex = this.props.activetab;
        const tabs = {};

        tabKeys.map((key, index) => {
            const active = activeIndex == index;
            tabs[key] = { key, active, index };
        });

        return tabs;
    }

    // Must iterate through all videos to find which movie has no series.
    isAnyWishlistedVideos = false;
    getAll() {
        const movies = [];
        const videos = this.props.videos;

        for (const key in videos) {
            if (videos[key].wishlist) {
                movies.push(videos[key]);
                this.isAnyWishlistedVideos = true;
            }
        }
        return movies;
    }

    getAllMovies() {
        const movies = [];
        const videos = this.props.videos;

        for (const key in videos) {
            if (!videos[key].wishlist) {
                continue;
            }

            if (videos[key].series == undefined) {
                movies.push(videos[key]);
            }
        }
        return movies;
    }

    getVideoFromTag(tag) {
        const programs = [];
        const videoKeys = this.props.tags[tag].videos;

        for (const key in this.props.tags[tag].videos) {
            const videoKey = this.props.tags[tag].videos[key];

            if (this.props.videos[videoKey].wishlist) {
                programs.push(this.props.videos[videoKey]);
            }
        }
        return programs;
    }

    getTiles(tabKeys) {
        let programs = [];
        const tiles = [];
        const currentTab = tabKeys[this.props.activetab];
        switch (currentTab) {
        case 'All':
            programs = this.getAll();
            break;
        case 'Movies':
            programs = this.getAllMovies();
            break;
        default:
            programs = this.getVideoFromTag(currentTab);
        }

        for (const key in programs) {
            tiles.push(
                <MasonryImageTile
                key={`channel-tile-${key}`}
                poster={programs[key].thumbnail}
                handleClick={() => this.handleTileOpen(programs[key])}
                />,
            );
        }
        return tiles;
    }


    render() {
        const tabKeys = [
            'All', 'Movies',
        ];
        const allVideos = this.getAll();
        for (let i = 0; i < allVideos.length; i++) {
            console.log('?', allVideos[i]);
            console.log(allVideos[i].tags);
            if (tabKeys.indexOf(allVideos[i].tags) <= -1) {
                tabKeys.push(allVideos[i].tags);
            }
        }


        return (
            <div className="programsPage ">
                <FilterTabs
                    tabItems={tabKeys}
                    activeTab={this.props.activetab}
                    changeTab={this.changeTab}
                    colortheme="dark"
                />
                <div className="container-fluid">
                    <MasonryContainer>
                        {this.isAnyWishlistedVideos ?
                        this.getTiles(tabKeys) :
                        <p>{i18next.t("wishlist_no_videos")}</p> }
                    </MasonryContainer>
                </div>

            </div>
        );
    }
}

WishlistPage.propTypes = {
    videos: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    series: PropTypes.object.isRequired,
    seasons: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    videos: state.videos.items,
    series: state.series.items,
    activetab: state.programsPage,
    seasons: state.seasons.items,
    series: state.series.items,
    tags: state.tags.items,
});


export default connect(mapStateToProps)(WishlistPage);
