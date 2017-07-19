import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import PropTypes from 'prop-types';

import MasonryContainer from '../components/common/MasonryContainer';
import MasonryImageTile from '../components/common/MasonryImageTile';
import FilterTabs from '../components/common/FilterTabs';
import CirclesRow from '../components/common/CirclesRow';

import CardContainer from '../containers/homepage/CardContainer';

import { changeSearchFilterIndex } from '../actions/search';
import { videoSelected } from '../actions/video';
import { showOverlay } from '../actions/overlay';
import { showVideoCard, changeVideoInfo } from '../actions/videoCard';

import videoPrefix from '../constants/mediaPrefix';

class SearchContainer extends Component {

    handleTileOpen = (video) => {
        this.props.dispatch(changeVideoInfo(video));
        // this.props.dispatch(changeCardCategory(category));
        this.props.dispatch(showVideoCard());
    }

    handleTilePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }

    satisfyFilter = (filter, video) => {
        //this.props.search.isSearching || !this.props.filter.isClear
        if(filter == "series"){
            if(video.series != undefined) return true
        } else if (filter == "movies"){
            if(video.series == undefined) return true
        } else {
            //console.log("filter on tags, description, title etc...", filter, video);
            return this._compareMetadata(filter, video);
        }
    }


    _compareMetadata = (filter, video) => {
        filter = filter.toLowerCase();
        if(video.tags.toLowerCase() == filter)return true
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
        const filterOn = tabs[this.props.activeFilter];
        

        for (const key in videos) {
            const video = videos[key];

            if (this.satisfyFilter(filterOn, video)) {
                tiles.push(
                    <MasonryImageTile
                        key={`search-tile-${video.id}`}
                        poster={video.thumbnail}
                        handleClick={() => this.handleTileOpen(video)}
                    />
                );
            }
        }
        return tiles
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
            "series", "movies"
        ];
        //Append all tags to tabkeys.
        for(const key in this.props.tags){
            tabs.push(this.props.tags[key].key);
        }

        return (
          <div className={(this.props.search.isOpen) ? 'searchContainer expand' : 'searchContainer close'}>
            <h4 className="container-fluid hideOnMobile">{i18next.t('filter')}</h4>
            
            <FilterTabs tabItems={tabs} activeTab={this.props.activeFilter} changeTab={this.changeTab}/>
            
            <h4 className="container-fluid">{i18next.t('suggested_people')}</h4>
            
            <CirclesRow items={people} />


            <div className="container-fluid">

              {this.props.search.isSearching
                    ? <h4>{i18next.t('search_results')} {this.props.search.keyword}</h4>
                    : <h4>{i18next.t('suggested_videos')}</h4>
                }

              <CardContainer />
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
    videos: PropTypes.array.isRequired,
    search: PropTypes.object.isRequired,
    activeFilter: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    search: state.search,
    activeFilter: state.searchFilterTab,
    videos: state.videos.items,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(SearchContainer);
