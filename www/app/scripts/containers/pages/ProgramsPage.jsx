import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';
import { videoSelected, resetCurrentTimeInPlayer } from '../../actions/videoPlayer';
import { changeProgramTabIndex } from '../../actions/pages/programsPage';
import { maximizeOverlayX, openOverlayX } from '../../actions/overlayX';
import FilterTabs from '../../components/HorizontalScroll/FilterTabs';


class ProgramsPage extends React.Component {
    handleTileOpen = (video) => {
        // this.props.dispatch(changeVideoInfo(video));
        // this.props.dispatch(changeCardCategory(category));
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }

    changeTab = (index) => {
        this.props.dispatch(changeProgramTabIndex(index));
    }

    tiles_handleFilter = (filterArray, video, filterby) => {
        // console.log(filterArray, video, filterby);
       /* if(filterArray === 'series') return this.episodeList(video);
        else return null*/
        if (filterArray === 'Series') {
            // Should also be a variable for Episode number so we could get the episode number. For now use season.
            if (video.series !== undefined && video.season === 1) {
                return true;
            }
        } else if (filterArray === 'Movies') {
            if (video.series === undefined) {
                return true;
            }
        } else if (video.tags === filterArray) {
            return true;
        }

        return false;
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

    render() {
        const tabKeys = [
            'Series', 'Movies',
        ];
        // Append all tags to tabkeys.
        for (const key in this.props.tags) {
            tabKeys.push(this.props.tags[key].key);
        }


        return (
            <div className="programsPage ">
                <FilterTabs
                    tabItems={tabKeys}
                    activeTab={this.props.activetab}
                    changeTab={this.changeTab}
                    colortheme="dark"
                />
                <br />
                <div className="container-fluid">
                    <MasonryContainer>
                        {this.getTiles(tabKeys)}
                    </MasonryContainer>
                </div>

            </div>
        );
    }
}

ProgramsPage.propTypes = {
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


export default connect(mapStateToProps)(ProgramsPage);
