import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

export default function ContentMotionController(props) {
    const _y = props.isOpen ? (props.isMaximized ? -100 : 0) : 0;
    const _o = props.isOpen ? (props.isMaximized ? 1 : 0) : 0;
    let _h = window.innerHeight - props.videoHeight < 0 ? 0 : window.innerHeight - props.videoHeight;
    _h = isNaN(_h) ? 0 : _h;
    return (
        <Motion style={{
            y: spring(_y, { stiffness: 60, damping: 15 }),
            o: spring(_o, { stiffness: 60, damping: 15 }),
            h: _h,
        }}
        >
            {({ y, o, h }) =>
                (<div className={'video-content-container'} style={{ transform: `translate3d(0, ${y}%, 0)`, opacity: o, height: h }}>
                    {props.children}
                </div>)
            }
        </Motion>
    );
}

ContentMotionController.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

