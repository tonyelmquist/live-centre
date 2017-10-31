import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
    const renderContent = () => (
      <div className="content">
        {props.children[props.active]}
      </div>
        );
    return (
      <div className="tabs">
        {renderContent()}
      </div>
    );
};

Tabs.propTypes = {
    active: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default Tabs;
