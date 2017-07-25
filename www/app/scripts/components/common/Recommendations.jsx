import React from 'react';
import PropTypes from 'prop-types';

const Recommendations = (props) => {


    return (
      <div>Recommendations:</div>
    );
};

Recommendations.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Recommendations;
