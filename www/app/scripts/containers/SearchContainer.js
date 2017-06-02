import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SearchContainer extends Component {
    handleSearch = (keyword) => {
        console.log("searching");        
    };

    render() {
        console.log(this.props.search.isOpen);
        return (
            <div className={(this.props.search.isOpen) ? "searchContainer expand" : "searchContainer close"}>

                <div>
                    #Category #filters
                </div>

                <div>Search results</div>

                <div>Suggested people</div>

                <div>Suggested Videos</div>
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

export default connect(mapStateToProps)(SearchContainer);
