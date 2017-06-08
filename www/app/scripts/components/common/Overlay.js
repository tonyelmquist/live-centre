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
    const _renderContent = () => {
        const max_elements = 50;
        const zeros_array = new Array(max_elements).fill(0);
        console.log(zeros_array);
        return zeros_array.map((elem, index)=> (
            <h1 key={index}>Content</h1>
        ));
    };

    return (
        <div className='fs-overlay'>
            <div className='overlay-header'>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}>
                    <ArrowBack hoverColor={blue500}/>
                </IconButton>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onTouchTap={() => document.getElementsByClassName("fs-overlay")[0].style.display = "none"}>
                    <Close hoverColor={red500}/>
                </IconButton>

            </div>
            {/* {_renderContent()} */}
            {/* {props.children} */}

        </div>
    );
};

Overlay.propTypes = {
    children: PropTypes.func.isRequired
};

export default Overlay;
