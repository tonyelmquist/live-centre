import React from 'react';
import PropTypes from 'prop-types';

const TabLinks = ({items, active, handleChange}) => {
    // const handleClick = () => {};
    // console.log(handleChange);
    const _createLinks = () => {
        return items.map((elem, index) =>
            <button className={"tab-link".concat((index === active) ? " active": "")}
                key={index} onClick={()=> handleChange(index)}>
                {elem}
            </button>
        );
    };
    return (
        <div className = "tab-controls">
            {_createLinks()}
        </div>
    );
};

TabLinks.propTypes = {
    items: PropTypes.array.isRequired,
    active: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default TabLinks;
