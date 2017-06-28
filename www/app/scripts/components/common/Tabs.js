import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
    const _renderContent = () => (
      <div className="content">
        {props.children[props.active]}
      </div>
        );
    return (
      <div className="tabs">
        {_renderContent()}
      </div>
    );
};

Tabs.propTypes = {
    active: PropTypes.number.isRequired,
    children: PropTypes.node,
};

export default Tabs;
