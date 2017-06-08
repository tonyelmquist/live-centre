import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Close from 'material-ui/svg-icons/navigation/close';
import {red500, blue500} from 'material-ui/styles/colors';

const styles ={
    mediumIcon: {
        width: 28,
        height: 28
    },
    medium: {
        width: 40,
        height: 40,
        padding: 8
  }
};

const Overlay = (props) => {
    return (
        <div className='fs-overlay'>
            <div className='overlay-header'>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onTouchTap={props.handleClose}>
                    <ArrowBack hoverColor={blue500}/>
                </IconButton>
            </div>
            {props.children}

        </div>
    );
};

Overlay.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.object
};

export default Overlay;
