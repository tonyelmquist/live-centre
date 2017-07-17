import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const SearchFilters = (props) => {
    console.log(props);
    const filterItems = () => {
        if (props.filters) {
            return Object.keys(props.filters).map(key =>

                (<RaisedButton
                  key={key}
                  label={i18next.t(key)}  // Translate the key here.
                  className={props.filters[key].active ? 'filterButtons active' : 'filterButtons'}
                  onTouchTap={() => props.handleFilter(props.filters[key])}
                  primary
                  style={props.style}
                />),
            );
        }
    };


    return (
      <div className={`horizontalScroll filterContainer ${props.color}`}>
        <div className="horizontalScrollInner">
          {filterItems()}
        </div>
      </div>
    );
};

SearchFilters.propTypes = {
    handleFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    color: PropTypes.string,
    style: PropTypes.array
};

SearchFilters.defaultProps = {
    style: {}
}

export default SearchFilters;
