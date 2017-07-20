import React, { Component } from 'react';
import PropTypes from 'prop-types';

function CirclesRow (props){
    return (
      <div className="horizontalScroll">
        <div className="horizontalScrollInner">
          {props.children}
        </div>
      </div>
    );
}

CirclesRow.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CirclesRow;
