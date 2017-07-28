import React from 'react';
import i18next from 'i18next';

import PropTypes from 'prop-types';

class SearchInput extends React.Component {
    componentDidUpdate(){
      if(this.props.searchState.isOpen){
        this.searchInput.focus();
      }
    }
    render() {
      console.log("searchstate", this.props.searchState.isOpen);
        return (
          <div className="searchInput inline">
            <input
              name="search"
              type="text"
              ref={(input) => { this.searchInput = input; }}
              placeholder={i18next.t('search_placeholder')}
              onChange={this.props.handleSearch}
            />
          </div>
        );
    }
}

  // = ({ handleSearch }) =>
  // (<div className="searchInput inline">
  //   <input
  //     name="search"
  //     type="text"
  //     ref={(input) => { this.searchInput = input; }}
  //     placeholder={i18next.t('search_placeholder')}
  //     onChange={handleSearch}
  //   />
  // </div>);

SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default SearchInput;
