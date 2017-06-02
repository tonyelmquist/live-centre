import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SearchFilter extends Component {
    //Array of filters to pass to the search function. 
    handleFilter = (filters) => {
        console.log("searching");        
    };

    getSearchFilters = () => {
        //Should probably also be some key
        const filters = ["All", "Videos", "Series", "Channels"];
        return filters;
    }


    render() {
        console.log(this.props.search.isOpen);
        return (
            <div className="searchFilters">

            </div>
        );
    };
};
/*
SearchContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};
*/

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps)(SearchFilter);
