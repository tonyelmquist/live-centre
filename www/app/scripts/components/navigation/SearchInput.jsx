import React from 'react';
import i18next from 'i18next';

import PropTypes from 'prop-types';

class SearchInput extends React.Component {
    
    keyDown = (e) => {
      console.log("KEY DOWN", e.keyCode);
      if(e.keyCode === 13){
        console.log("enter");
        this.SearchInput.blur();
      }
    }
    render() {
        return (
          <div className="searchInput inline">
            <input
              name="search"
              type="search"
              placeholder={i18next.t('search_placeholder')}
              onChange={this.props.handleSearch}
              onKeyDown={(e) => this.keyDown(e)}
              onFocus={() => this.props.handleSearchFocus(true)}
              onBlur={() => this.props.handleSearchFocus(false)}
              ref={(ref) => { this.SearchInput = ref; }}
            />
          </div>
        );
    }
}


SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleSearchFocus: PropTypes.func.isRequired,
};

export default SearchInput;
