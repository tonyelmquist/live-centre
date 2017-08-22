import React from 'react';
import FontAwesome from 'react-fontawesome';

const Spinner = (props) => {

    return (
        <div style={{
            ...props.style,
            position: 'absolute',
            top: '45vh',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'auto',
            filter: 'drop-shadow(5px 5px 5px #222)',
        }}>
            <FontAwesome name="spinner" pulse size="2x"/>
        </div>
    );
};

export default Spinner;
