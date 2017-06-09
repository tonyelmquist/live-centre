import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui/svg-icons/action/search';
import MediaQuery from 'react-responsive';
import IconButton from 'material-ui/IconButton';
import AnimatedSearchIcon from './animatedIcons/AnimatedSearchIcon';
import SearchInput from './header/SearchInput';

//Should also have validation.
//A tutorial: http://redux-form.com/6.0.0-rc.1/examples/material-ui/
//Autocomplete material ui: http://www.material-ui.com/#/components/auto-complete

const SearchBar = ({searchState, openCloseSearch}) => {
  return(
		<div className="inline ">
			<MediaQuery minWidth={1000}>
			{searchState.isOpen
				? <SearchInput  searchState={searchState}/>
				: <div/>
			}
			</MediaQuery>
			<IconButton className="iconbutton" onTouchTap={() => openCloseSearch()}>
				<AnimatedSearchIcon searchState={searchState}/>
			</IconButton> 

		</div>

    );
};

SearchBar.propTypes = {
    searchState: PropTypes.object,
    openCloseSearch: PropTypes.func.isRequired,
};

export default SearchBar;