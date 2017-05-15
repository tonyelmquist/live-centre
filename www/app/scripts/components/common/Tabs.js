import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
    const _renderContent = () => {
        return (
            <div className="tabs__content">
                {props.children[props.active]}
            </div>
        );
    };
    return (
        <div className="tabs">
            {_renderContent()}
        </div>
    );
};

Tabs.propTypes = {
    active : PropTypes.number.isRequired,
    children: PropTypes.node
};

export default Tabs;
