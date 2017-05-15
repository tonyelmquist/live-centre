import React from 'react';
import PropTypes from 'prop-types';

const TabLinks = ({items, active}) => {
    // const handleClick = () => {};
    const _createLinks = () => {
        items.map((elem, index) => {
            <button className={"tab-link".concat((index === active) ? " active": "")}
                key={index}>
                {elem}
            </button>;
        });
    };
    return (
        <div className = "tab-control flex-container">
            {_createLinks()}
        </div>
    );
};

TabLinks.propTypes = {
    items: React.PropTypes.array.isRequired
};

export default TabLinks;
