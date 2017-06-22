import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import VideoGrid from '../components/common/VideoGrid';
import MasonryTiles from '../components/common/MasonryTiles';

import PortraitRow from '../components/common/PortraitRows';
import {toggleFilter, clearFilter} from '../actions/search.js';


class SearchContainer extends Component {
    /*One or more of the filteritems can have a clear property that when clicked,
    will reset the filters. */
    handleFilter = (filteritem) => {
        if(filteritem.clear == true){
            //console.log("CLEAR FILTERS");
            this.props.dispatch(clearFilter());
        } else{
            //console.log(filteritem.key);
            this.props.dispatch(toggleFilter(filteritem.key));
        }   

    }

    render() {
        const people = [
            {img: "/img/avatars/1.jpg",  username:"Lisa1", uid:0},
            {img: "/img/avatars/2.jpg",  username:"Per", uid:1},
            {img: "/img/avatars/3.jpg",  username:"BoyGamer19", uid:2},
            {img: "/img/avatars/4.jpg",  username:"Lisa2", uid:3},
            {img: "/img/avatars/5.jpg",  username:"Mari", uid:4},
            {img: "/img/avatars/6.jpg",  username:"Helene", uid:5},
            {img: "/img/avatars/1.jpg",  username:"Hans1", uid:6},
            {img: "/img/avatars/2.jpg",  username:"SuperNintendoLongNameTest", uid:7},
            {img: "/img/avatars/3.jpg",  username:"Hans2", uid:8},
            {img: "/img/avatars/4.jpg",  username:"Petter", uid:9},
        ];



        const createFilterFromTags = (tags) => {
            //console.log(tags);
            let filters = [];

            //Used to clear the filters. 
            filters.push({key: "all", clear: true, active:true}); 

            if(tags.length > 0){
                filters = tags.map((tag) => {
                    return {key: tag.name};
                });
            }
            
            return filters;
            
        };

        //Extract the filter strings so they can be combined with searchquery. 
        const parseFilters = (filters) => {
            const parsed = [];
            for(const key in filters){
                if(filters[key].active){
                    parsed.push(filters[key].filterOn);
                }
            }
            return parsed;
        };

        return (
            <div className={(this.props.search.isOpen) ? "searchContainer expand" : "searchContainer close"}>
                <h4 className="container-fluid hideOnMobile">{i18next.t("filter")}</h4>
                <SearchFilters handleFilter={this.handleFilter} filters={this.props.filter.filters}/>
                
                <h4 className="container-fluid">{i18next.t("suggested_people")}</h4>  
                <PortraitRow people={people}/>

                <div className="container-fluid">

                    {this.props.search.isSearching 
                        ? <h4>{i18next.t("search_results")} {this.props.search.keyword}</h4> 
                        : <h4>{i18next.t("suggested_videos")}</h4>
                    }

                    {/*Uncategorized is a temporary "suggested" category that is default. */}
                    <MasonryTiles  
                    filter={    this.props.search.isSearching || !this.props.filter.isClear
                                ? [this.props.search.keyword, ...parseFilters(this.props.filter.filters)]
                                : ["Lost In Time"]}
                    videos={this.props.videos}
                    />

                </div>
             
            </div>
        );
    };
};

SearchContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videos : PropTypes.array.isRequired,
    search: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    search: state.search,
    filter: state.filter,
    videos: state.videos.items,
    tags: state.tags.items

});

export default connect(mapStateToProps)(SearchContainer);
