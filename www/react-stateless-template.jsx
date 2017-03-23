import React from 'react';

const HelloMessage = (props) => {
    return (<div>Hello, {props.name}</div>);
};

HelloMessage.propTypes = {
    name: React.PropTypes.string
};
HelloMessage.defaultProps = {
    name: 'John Doe'
};

export default HelloMessage;
