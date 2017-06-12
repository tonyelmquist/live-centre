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

const SearchFilters = () => {

    const filterItems = (filters) => {
        if(filters){
            return filters.map((item) =>
                    <RaisedButton 
                        label={item.key} 
                        key={item.key}
                        className={item.active? "filterButtons active" : "filterButtons"}
                        primary={true} 
                    />
            );
        };
    };

    const filters = [
        {key: "all", active: true},
        {key: "videos",  },
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
                {filterItems(filters)}
            </div>
        </div>
    );
};
/*
SearchFilters.propTypes = {

};*/

/*
                    <div key={item} 
                    onTouchTap={()=>{console.log("Execute something");}}
                    className="items">
                        {item}
                    </div>

*/

export default SearchFilters;
