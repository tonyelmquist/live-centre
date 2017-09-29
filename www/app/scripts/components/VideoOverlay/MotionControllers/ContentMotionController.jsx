import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

class ContentMotionController extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _y: 0,
            _o: 0,
            _h: 0
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.isOpen !== this.props.isOpen || prevProps.isMaximized !== this.props.isMaximized){
            if(this.props.isOpen){
                setTimeout(()=> {
                    console.log("Setup motion after 1000ms")
                    this.setupMotion();
                }, 300);
            } else {
                this.setupMotion();
            }
        }
    }

    setupMotion = () => {
        const { isOpen, isMaximized, videoHeight } = this.props;
        const _y = isOpen ? (isMaximized ? -100 : 0) : 0;
        const _o = isOpen ? (isMaximized ? 1 : 0) : 0;
        let _h = window.innerHeight - videoHeight < 0 ? 0 : window.innerHeight - videoHeight;
        _h = isNaN(_h) ? 0 : _h;

        this.setState({ _y, _o, _h });
    }

    
    render() {
        const config = {
            stiffness: 90,
            damping: 15,
        };
        return (
            <Motion style={{
                y: spring(this.state._y, config),
                o: spring(this.state._o, config),
                h: this.state._h,
            }}
            >
                {({ y, o, h }) =>
                    (<div className={'video-content-container'} style={{ transform: `translate3d(0, ${y}%, 0)`, opacity: o, height: h }}>
                        {this.props.children}
                    </div>)
                }
            </Motion>
        );
    }
}

ContentMotionController.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    videoHeight: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default ContentMotionController;
