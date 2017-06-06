import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import VideoGrid from '../components/common/VideoGrid';
class SearchContainer extends Component {
    handleSearch = (keyword) => {
        console.log("searching");        
    };

    handleSelect = () => {
        console.log("SELECTING VIDEO");
    }

    /*const people = [
        {img: 'https://placehold.it/50x50', name:'Lisa', uid:'0'},
        {img: 'https://placehold.it/50x50', name:'Per', uid:'1'},
        {img: 'https://placehold.it/50x50', name:'Ola', uid:'2'},
    ];*/

    render() {
        console.log(this.props.search.isOpen);
        console.log(this.props);
        console.log(this.props.videos['-1'])
        return (
            <div className={(this.props.search.isOpen) ? "searchContainer expand" : "searchContainer close"}>
                <SearchFilters />

                <div className={(this.props.search.isSearching) ? "container-fluid expand" : "container-fluid close"}>
                    <h3>Search results</h3>
                    Show when searching. And removes the other containers.
                </div>

                <div className="container-fluid">
                    <h3>Suggested people</h3>
                  
                </div>

                <div className="container-fluid">
                    <h3>Suggested Videos</h3>
                    <VideoGrid
                        videos={this.props.videos['Uncategorized']/*This is just a random category, should load suggested videos*/}
                        onSelect={this.handleSelect}
                    />
                </div>
            </div>
        );
    };
};
/*
SearchContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

                    
*/

SearchContainer.propTypes = {
    videos : PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    search: state.search,
    videos: state.videos.items
});

export default connect(mapStateToProps)(SearchContainer);
