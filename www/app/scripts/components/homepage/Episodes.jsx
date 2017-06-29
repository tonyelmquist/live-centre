import React from 'react';
import PropTypes from 'prop-types';

const Episodes = props => (
  <div>{props.items}</div>
);

Episodes.defaultProps = {
    items: [],
};

Episodes.propTypes = {
    items: PropTypes.array,
};

export default Episodes;
