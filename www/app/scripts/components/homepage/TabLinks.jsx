import React from 'react';
import PropTypes from 'prop-types';

const TabLinks = (props) => {
    const active = props.active;
    const handleChange = props.handleChange;
    const createLinks = () => props.items.map((elem, index) =>
            (<button
              className={'tab-link'.concat((index === active) ? ' active' : '')}
              onClick={() => handleChange(index)}
            >
              {elem}
            </button>),
        );
    return (
      <div className="tab-controls">
        {createLinks()}
      </div>
    );
};

TabLinks.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    active: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default TabLinks;
