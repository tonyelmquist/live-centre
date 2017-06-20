import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import VideoGrid from '../components/common/VideoGrid';
import MasonryTiles from '../components/common/MasonryTiles';

import PortraitRow from '../components/common/PortraitRows';
import {filterKeywords, removeFilter, clearFilter} from '../actions/search.js';


class SearchContainer extends Component {
    mergeVideoArray(video){
        const merged = [];
        for(const key in video){
            merged.push(...video[key]);
        }
        return merged;
    };
    /*One or more of the filteritems can have a clear property that when clicked,
    will reset the filters. */
    handleFilter = (filteritem) => {
        if(filteritem.clear){
            //this.props.dispatch(clearFilter());
        } else if(filteritem.active){
            //this.props.dispatch(removeFilter(filteritem.key))
        } else{
            filteritem.active = true;
            this.props.dispatch(filterKeywords(filteritem.key));
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

        return (
            <div className={(this.props.search.isOpen) ? "searchContainer expand" : "searchContainer close"}>
                <h4 className="container-fluid hideOnMobile">Filter:</h4>
                <SearchFilters handleFilter={this.handleFilter} />
                
                <h4 className="container-fluid">Suggested people</h4>  
                <PortraitRow people={people}/>

                <div className="container-fluid">

                    {this.props.search.isSearching 
                        ? <h4>Search results for: {this.props.search.keyword}</h4> 
                        : <h4>Suggested Videos</h4>
                    }
                    {/*Uncategorized is a temporary "suggested" category that is default. */}
                    <MasonryTiles 
                    //filter={this.props.search.isSearching ? this.props.search.keyword : "Uncategorized"} 
                    filter={    this.props.search.isSearching || !this.props.filter.isClear
                                ? [this.props.search.keyword, ...this.props.filter.filters]
                                : ["Uncategorized"]}
                    videos={this.mergeVideoArray(this.props.videos)}
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

});

export default connect(mapStateToProps)(SearchContainer);
