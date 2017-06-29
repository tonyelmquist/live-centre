import React from 'react';
import i18next from 'i18next';

import PropTypes from 'prop-types';

const SearchInput = ({ handleSearch }) =>
  (<div className="searchInput inline">
    <input
      name="search"
      type="text"
      placeholder={i18next.t('search_placeholder')}
      onChange={handleSearch}
    />
  </div>);

SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default SearchInput;
