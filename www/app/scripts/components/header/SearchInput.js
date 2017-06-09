import React, {Component} from 'react';

import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class SearchInput extends Component{

	render(){
		return(
			<div className="searchInput inline">
				<input 
					name="search"
					type="text" 
					placeholder="Jeg vil se..."
					onChange={this.props.handleSearch}
					autoFocus
				/>

			</div>
		);
	}
	
}

SearchInput.propTypes = {
	searchState: PropTypes.object,
	handleSearch: PropTypes.func
};

export default SearchInput;