import React from 'react';
import PropTypes from 'prop-types';
import ExpandIcon from 'material-ui/svg-icons/navigation/expand-more'
import { Motion, spring } from 'react-motion';

const AnimatedExpandIcon = ({isCollapsed}) => {

    return (
        <Motion style={isCollapsed ? {rot:spring(0)} : {rot:spring(180)}}>
            {style =>
                (<ExpandIcon className="expandIcon"
                style={{color: 'white',
                        transform: `rotate(-${style.rot}deg)`
                        }}
                />)
            }
        </Motion>

    );
};

AnimatedExpandIcon.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
};

export default AnimatedExpandIcon;
