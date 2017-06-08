import React from "react";
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
const SearchInput = ({searchState}) => {

	return(
		<div 
			className="searchInput inline">

			<input 
				name="search"
				type="text" 
				placeholder="Jeg vil se..."
				autoFocus
			/>

		</div>
	);
};

SearchInput.propTypes = {
	searchState: PropTypes.object
};

export default SearchInput;