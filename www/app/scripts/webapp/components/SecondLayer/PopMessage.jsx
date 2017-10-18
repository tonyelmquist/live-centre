import React from 'react';
import PropTypes from 'prop-types';

const PopMessage = (props) => (
        <div className={`popup-message ${props.show
          ? 'show'
          : ''}`}>
        {props.message}
    </div>

);  

export default PopMessage;
