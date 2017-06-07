import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Close from 'material-ui/svg-icons/navigation/close';
import {red500, blue500} from 'material-ui/styles/colors';

const styles ={
    mediumIcon: {
        width: 42,
        height: 42
    },
    medium: {
        width: 64,
        height: 64,
        padding: 8
  }
};

const Overlay = (props) => {
    return (
        <div className='fs-overlay'>
            <div className='header'>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
                    <ArrowBack hoverColor={blue500}/>
                </IconButton>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
                    <Close hoverColor={red500}/>
                </IconButton>


            </div>
            {props.children}
        </div>
    );
};

Overlay.propTypes = {
    children: PropTypes.func.isRequired
};

export default Overlay;
