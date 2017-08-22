import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import PropTypes from 'prop-types';

import MasonryContainer from '../components/Masonry/MasonryContainer';
import MasonryImageTile from '../components/Masonry/MasonryImageTile';
import MasonryTextOverlay from '../components/Masonry/MasonryTextOverlay';

//import FilterTabs from '../components/HorizontalScroll/FilterTabs';
import FilterTabs from './FilterTabs';
import HorizontalScrollContainer from '../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../components/HorizontalScroll/CircleRowItem';
import { changeSearchFilterIndex } from '../actions/search';
import { videoSelected, resetCurrentTimeInPlayer } from '../actions/videoPlayer';
import { maximizeOverlayX, openOverlayX } from '../actions/overlayX';

class SearchContainer extends Component {

    handleTileOpen = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }


    satisfyFilter = (filter, video) => {
        //this.props.search.isSearching || !this.props.filter.isClear
        if(filter == "All"){
            return true
        }
        if(filter == "Series"){
            if(video.series != undefined) return true
        } else if (filter == "Movies"){
            if(video.series == undefined) return true
        } else {
            //console.log("filter on tags, description, title etc...", filter, video);
            return this._compareMetadata(filter, video);
        }
    }

    satisfySearch(searchQuery, video){
       // console.log("searchquery:",searchQuery);
        if(searchQuery.length > 0){
            //console.log("satisfy?",video.title,this._compareMetadata(searchQuery, video));
            return this._compareMetadata(searchQuery, video);
        } 
        return true
    }


    _compareMetadata = (filter, video) => {
       // console.log("compare: ",filter);
        filter = filter.toLowerCase();
        if(video.tags.toLowerCase() == filter) return true
        if(video.title.toLowerCase().includes(filter)) return true
        if(video.series != undefined && video.series.toLowerCase().includes(filter)) return true
        else return false
    }

    changeTab = (index) => {
        this.props.dispatch(changeSearchFilterIndex(index));
    }

    getTiles = (tabs) => {
        const tiles = [];
        const videos = this.props.videos;;
        const filterIndex = this.props.activeFilter;
        let filterOn = tabs[filterIndex];
        const searchQuery = this.props.search.keyword;
        const isSearching = this.props.search.isSearching;

        if(filterIndex == 0 && !isSearching){
            filterOn = "Promotional Videos";
        }

        for (const key in videos) {
            const video = videos[key];

            if ( this.satisfyFilter(filterOn, video) && ( !isSearching || this.satisfySearch(searchQuery, video))) {
                tiles.push(
                    <MasonryImageTile
                        key={`search-tile-${video.id}`}
                        poster={video.thumbnail}
                        overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTileOpen} title={video.title}/>}
                        handleClick={() => this.handleTileOpen(video)}
                    />
                );
            }
        }
        return tiles
    }

    portraitOverlay = (person) => {
        return (
            <div className="circle-overlay">
                <p className="label">{person.key}</p>
            </div>
        );
    }

    getPortraitItems = (people) => {
        return people.map(person => (
            <CircleRowItem
                img={person.img}
                key={person.key}
                size={50}
                overlay={
                    (this.portraitOverlay(person))
                }
            />
        ));
    }


    render() {
        const people = [
            { img: '/img/avatars/1.jpg', key: 'Lisa10', uid: 0 },
            { img: '/img/avatars/2.jpg', key: 'Per1', uid: 1 },
            { img: '/img/avatars/3.jpg', key: 'BoyGamer192', uid: 2 },
            { img: '/img/avatars/4.jpg', key: 'Lisa23', uid: 3 },
            { img: '/img/avatars/5.jpg', key: 'Mari4', uid: 4 },
            { img: '/img/avatars/6.jpg', key: 'Helene5', uid: 5 },
            { img: '/img/avatars/1.jpg', key: 'Hans16', uid: 6 },
            { img: '/img/avatars/2.jpg', key: 'SuperNintendoLongNameTest', uid: 7 },
            { img: '/img/avatars/3.jpg', key: 'Hans27', uid: 8 },
            { img: '/img/avatars/4.jpg', key: 'Petter8', uid: 9 },
        ];

        const tabs = [
            "All", "Series", "Movies",
        ];
        //Append all tags to tabkeys.
        for(const key in this.props.tags){
            tabs.push(this.props.tags[key].key);
        }

        let contentHeading = <h4 />;

        if (this.props.search.isSearching){
            contentHeading = <h4>{i18next.t('search_results')} {this.props.search.keyword} </h4>;
        } else if (this.props.activeFilter !== undefined){
            contentHeading = <h4>{i18next.t('search_results')} {i18next.t(tabs[this.props.activeFilter])} </h4>;
        } else {
            contentHeading = <h4>{i18next.t('suggested_videos')}</h4>;
        }
        return (
          <div className={(this.props.search.isOpen) ? 'searchContainer expand' : 'searchContainer close'}>
            <h4 className="container-fluid hideOnTablet">{i18next.t('filter')}</h4>
            
            <FilterTabs tabItems={tabs} activeTab={this.props.activeFilter} changeTab={this.changeTab}/>
            
            <div className="container-fluid">
            {!this.props.search.isFocused && (this.props.activeFilter === 0) //3 == people
                ? (<div><h4>{i18next.t('suggested_people')}</h4>
                    <HorizontalScrollContainer height={75}>
                        {this.getPortraitItems(people)}
                    </HorizontalScrollContainer> </div>)
                : <span />
            }
                {contentHeading}

              <MasonryContainer>
                  {this.getTiles(tabs)}
              </MasonryContainer>

            </div>

          </div>
        );
    }
}

SearchContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videos: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    activeFilter: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    search: state.search,
    activeFilter: state.searchFilterTab,
    videos: state.videos.items,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(SearchContainer);
