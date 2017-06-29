import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import IconButton from 'material-ui/IconButton';
import AnimatedSearchIcon from '../animatedIcons/AnimatedSearchIcon';
import SearchInput from './SearchInput';

// Should also have validation.
// A tutorial: http://redux-form.com/6.0.0-rc.1/examples/material-ui/
// Autocomplete material ui: http://www.material-ui.com/#/components/auto-complete

const SearchBar = ({ searchState, handleSearch, openCloseSearch }) =>
  (<div className="inline ">
    <MediaQuery minWidth={1000}>
      {searchState.isOpen
        ? <SearchInput handleSearch={handleSearch} searchState={searchState} />
        : <div />}
    </MediaQuery>
    <IconButton className="iconbutton" onTouchTap={() => openCloseSearch()}>
      <AnimatedSearchIcon searchState={searchState} />
    </IconButton>
  </div>);

SearchBar.propTypes = {
    searchState: PropTypes.object.isRequired,
    openCloseSearch: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
