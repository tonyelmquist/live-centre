import React from 'react';
import PropTypes from 'prop-types';

const Episodes = props => (
  <div>{props.items}</div>
);

Episodes.defaultProps = {
    items: [],
};

Episodes.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any),
};

export default Episodes;
