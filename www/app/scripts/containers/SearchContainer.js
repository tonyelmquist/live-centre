import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import VideoGrid from '../components/common/VideoGrid';
import MasonryTiles from '../components/common/MasonryTiles';

import PortraitRow from '../components/common/PortraitRows';
class SearchContainer extends Component {
    /*handleSearch = (keyword) => {
        console.log("searching");        
    };

    handleSelect = (value) => {
        console.log("SELECTING VIDEO");
    };*/


    mergeVideoArray(video){
        const merged = [];
        for(let key in video){
            merged.push.apply(merged, video[key]);
        }
        return merged;
    }

    render() {
        const people = [
            {img: "https://placehold.it/50x50",  username:"Lisa", uid:0},
            {img: "https://placehold.it/50x50",  username:"Per", uid:1},
            {img: "https://placehold.it/50x50",  username:"BoyGamer19", uid:2},
            {img: "https://placehold.it/50x50",  username:"Lisa", uid:3},
            {img: "https://placehold.it/50x50",  username:"Mari", uid:4},
            {img: "https://placehold.it/50x50",  username:"Helene", uid:5},
            {img: "https://placehold.it/50x50",  username:"Hans", uid:6},
            {img: "https://placehold.it/50x50",  username:"SuperNintendoLongNameTest", uid:7},
            {img: "https://placehold.it/50x50",  username:"Hans", uid:8},
            {img: "https://placehold.it/50x50",  username:"Petter", uid:9},
        ];

        return (
            <div className={(this.props.search.isOpen) ? "searchContainer expand" : "searchContainer close"}>
                <SearchFilters />

                
                 <div className="container-fluid">
                    <h3>Suggested people</h3>  
                </div>
                <PortraitRow people={people}/>

                <div className="container-fluid">
                    {this.props.search.isSearching ? <h3>Search results for: {this.props.search.keyword}</h3> : <h3>Suggested Videos</h3>}
                    <MasonryTiles filter={this.props.search.isSearching ? this.props.search.keyword : "Uncategorized"} videos={this.mergeVideoArray(this.props.videos)}/> 
                </div>

                

                

                
            </div>
        );
    };
};

SearchContainer.propTypes = {
    videos : PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    search: state.search,
    videos: state.videos.items
});

export default connect(mapStateToProps)(SearchContainer);
