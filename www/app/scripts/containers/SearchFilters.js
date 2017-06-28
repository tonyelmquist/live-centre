import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const SearchFilters = (props) => {
    const filterItems = () => {
        if (props.filters) {
            return Object.keys(props.filters).map(key =>

                (<RaisedButton
                  key={key}
                  label={i18next.t(key)}  // Translate the key here.
                  className={props.filters[key].active ? 'filterButtons active' : 'filterButtons'}
                  onTouchTap={() => props.handleFilter(props.filters[key])}
                  primary
                />),
            );
        }
    };


    return (
      <div className="horizontalScroll filterContainer">
        <div className="horizontalScrollInner">
          {filterItems()}
        </div>
      </div>
    );
};

SearchFilters.propTypes = {
    handleFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
};


export default SearchFilters;
