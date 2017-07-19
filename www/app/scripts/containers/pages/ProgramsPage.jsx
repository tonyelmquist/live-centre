import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import videoPrefix from '../../constants/mediaPrefix';
import MasonryContainer from '../../components/common/MasonryContainer';
import MasonryVideoTile from '../../components/common/MasonryVideoTile';
import { videoSelected } from '../../actions/video';
import { showOverlay } from '../../actions/overlay';
import { showVideoCard, changeVideoInfo } from '../../actions/videoCard';
import CardContainer from '../homepage/CardContainer';
import SearchFilters from '../SearchFilters';
import { changeProgramTabIndex  } from '../../actions/ProgramsPage';

class ProgramsPage extends React.Component {

    handleTileOpen = (video) => {
        this.props.dispatch(changeVideoInfo(video));
        // this.props.dispatch(changeCardCategory(category));
        this.props.dispatch(showVideoCard());
    }

    handleTilePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }

    handlefilter = (filter) => {
        this.props.dispatch(changeProgramTabIndex(filter.index));
    }

    tiles_handleFilter = (filterArray, video, filterby) => {
        //console.log(filterArray, video, filterby);
       /* if(filterArray === 'series') return this.episodeList(video);
        else return null*/
        if(filterArray == "series"){
            //Should also be a variable for Episode number so we could get the episode number. For now use season. 
            if(video.series != undefined && video.season == 1){
                return true
            }
        } else if(filterArray == "movies"){
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


    render() {

        const tabKeys = [
            "series", "movies"
        ];
        //Append all tags to tabkeys.
        for(const key in this.props.tags){
            tabKeys.push(this.props.tags[key].key);
        }

        
        return (
            <div className="programsPage">
                <SearchFilters 
                    color="dark" 
                    style={{color:'red'}}
                    handleFilter={this.handlefilter} 
                    filters={this.tabs(tabKeys)} />

                
                    
                    <CardContainer />
                    <MasonryContainer>
                        <MasonryVideoTile
                        filter={tabKeys[this.props.activetab]} //what we are filtering on. 
                        videos={this.props.videos}
                        handleTileOpen={this.handleTileOpen}
                        handleTilePlay={this.handleTilePlay}
                        handlefilter={this.tiles_handleFilter}
                        />
                    </MasonryContainer>
                
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
    tags: state.tags.items
});




export default connect(mapStateToProps)(ProgramsPage);
