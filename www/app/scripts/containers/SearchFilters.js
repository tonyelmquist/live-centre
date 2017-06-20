import React from "react";
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
/*
const style = {
    marginRight: '12px',
    containerElement:{
        borderRadius: '10px',
    },
    labelStyle:{
        textTransform: 'none',
    }
};*/

const SearchFilters = (props) => {

    const filterItems = (filters) => {
        if(filters){
            return filters.map((item) =>

                <RaisedButton 
                    key={item.key}
                    label={item.key} 
                    className={item.active? "filterButtons active" : "filterButtons"}
                    onTouchTap={()=>props.handleFilter(item)}
                    primary={true} 
                />
            );
        };
    };

    const localFilters = [
        {key: "all", clear: true,  active: true },
        {key: "videos",},
        {key: "series",  },
        {key: "channels",  },
        {key: "uncategorized",  },
        {key: "-1",  },
        {key: "lost in time",  },
        {key: "the future group",  },
        {key: "NEP",  },
        {key: "test",  },
    ];

    return(
        <div className="horizontalScroll filterContainer">
            <div className="horizontalScrollInner">
                {filterItems(localFilters)}
            </div>
        </div>
    );
};

SearchFilters.propTypes = {
    handleFilter: PropTypes.func.isRequired,
};


export default SearchFilters;
