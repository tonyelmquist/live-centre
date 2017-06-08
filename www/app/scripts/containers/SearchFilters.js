import React from "react";
import PropTypes from 'prop-types';

const SearchFilters = () => {

    const filterItems = (filters) => {
        if(filters.length > 0){
            return filters.map((item) =>
                    <div key={item} 
                    onTouchTap={()=>{console.log("Execute something");}}
                    className="items">
                        {item}
                    </div>
            );
        };
    };

    const filters = ["All", "Videos", "Series", "Channels", "Some", "More", "Filters", "For", "Scrolling"];

    return(
        <div className="horizontalScroll filters">
            <div className="horizontalScrollInner">
                {filterItems(filters)}
            </div>
        </div>
    );
};
/*
SearchFilters.propTypes = {

};*/

export default SearchFilters;
