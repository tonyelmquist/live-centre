import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import videoPrefix from '../../constants/mediaPrefix';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryVideoTile from '../../components/masonry/MasonryVideoTile';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import { videoSelected } from '../../actions/video';
import { showOverlay } from '../../actions/overlay';
import { showVideoCard, changeVideoInfo } from '../../actions/videoCard';
import CardContainer from '../homepage/CardContainer';
import { changeProgramTabIndex  } from '../../actions/ProgramsPage';
import { maximizeOverlayX, openOverlayX, minimizeOverlayX } from '../../actions/overlayX';
import FilterTabs from '../../components/horizontal-scroll/FilterTabs';


class WishlistPage extends React.Component {

    handleTileOpen = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInOverlayX());
    }

    handleTilePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }

    changeTab = (index) => {
        this.props.dispatch(changeProgramTabIndex(index));
    }

    tiles_handleFilter = (filterArray, video, filterby) => {
        //console.log(filterArray, video, filterby);
       /* if(filterArray === 'series') return this.episodeList(video);
        else return null*/
        if(filterArray == "Series"){
            //Should also be a variable for Episode number so we could get the episode number. For now use season. 
            if(video.series != undefined && video.season == 1){
                return true
            }
        } else if(filterArray == "Movies"){
            if(video.series == undefined ){
                return true
            }
        } else {
            if(video.tags == filterArray){
                return true
            }
        }

        return false
        
    }

    //Must generate an object for the searchfilter box.
    tabs = (tabKeys) => {
        const activeIndex = this.props.activetab;
        const tabs = {};

        tabKeys.map(function(key, index){
            const active = activeIndex == index ? true : false;
            tabs[key] = {key: key, active: active, index: index};
            
        });

        return tabs
    }

    //Must iterate through all videos to find which movie has no series.
    getAllMovies(){
        const movies = [];
        const videos = this.props.videos;
        
        for(const key in videos){
            console.log(videos[key].wishlist);
            if (!videos[key].wishlist) {
                continue;
            }
            console.log('push');
            if(videos[key].series == undefined){
                movies.push(videos[key]);
            }
        }
        return movies;
    }

    getVideoFromTag(tag){
        const programs = [];
        const videoKeys = this.props.tags[tag].videos;
        for (const key in this.props.tags[tag].videos) {
            console.log(this.props.tags[tag].videos[key]);
            const videoKey = this.props.tags[tag].videos[key];
            if (!this.props.videos[videoKey].wishlist) {
                continue;
            }
            console.log('push');
            programs.push(this.props.videos[videoKey]);
        }
        return programs;
    }

    getTiles(tabKeys){
        let programs = [];
        const tiles = [];
        const currentTab = tabKeys[this.props.activetab];
        switch(currentTab){
            case "Movies":
                programs = this.getAllMovies();
                break;
            default:
                programs = this.getVideoFromTag(currentTab);
        }

        console.log('programs length', programs.length);

        for(const key in programs){
            tiles.push(
                <MasonryImageTile
                key={`channel-tile-${key}`}
                poster={programs[key].thumbnail}
                handleClick={() => this.handleTileOpen(programs[key])}
                />
            );
        }
        return tiles;
    }


    render() {

        const tabKeys = [
            "Movies"
        ];
        //Append all tags to tabkeys.
        for(const key in this.props.tags){
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
                <div className="container-fluid">       
                    <CardContainer />
                    <MasonryContainer>
                        {this.getTiles(tabKeys)}
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
    tags: state.tags.items
});




export default connect(mapStateToProps)(WishlistPage);
