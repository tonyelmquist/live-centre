import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Orientation } from '../../../../../../native/shared/constants/reduxConstants';
import { connect } from 'react-redux';
import { maximizeVideoOverlay, closeVideoOverlay, minimizeVideoOverlay } from '../../../../../../native/shared/actions/videoOverlay';
import { setControlBarVisibility, setVideoDimensions } from '../../../../../../native/shared/actions/videoPlayer';

class PlayerMotionController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            motionStyle: {
                y: 0,
                scale: 1,
                opacity: 0,
            },
        };
    }
    componentDidMount(){
        this.setupMotion();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen || prevProps.isMaximized !== this.props.isMaximized) {
            if(this.props.isOpen || this.props.isMaximized, this.props){
                setTimeout(()=> {
                    this.setupMotion();
                }, 300);
            } else {
                this.setupMotion();
            }
        }

        if (prevProps.orientation !== this.props.orientation){
            this.setupMotion();
        }
    }

    checkHeight = () => {
        if (typeof this.videoOverlay !== 'undefined' && this.props.isMaximized && this.props.isOpen){
            this.videoHeight = this.getHeight();
        } else {
            this.videoHeight = 200;
        }
    }

    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    };

    onTouchEnd = (e) => {
        this.endTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        if (this.startTouchPosition.y - this.endTouchPosition.y < -this.limit) {
            this.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.onMaximize();
        }
    };

    onMaximize = () => {
        console.log("on maximize");
        if (this.props.orientation === Orientation.PORTRAIT) {
            this.props.dispatch(maximizeVideoOverlay())
        }
        
    };

    onMinimize = () => {
        document.activeElement.blur();
        this.props.dispatch(setControlBarVisibility(false))
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.isMaximized) {
                this.props.dispatch(closeVideoOverlay())
            } else {
                this.props.dispatch(minimizeVideoOverlay())
            }
        } else {
            this.props.dispatch(closeVideoOverlay())
        }
    };

    getHeight = () => {
        if(this.videoOverlay!== 'undefined'){
            if(this.props.videoPlayer.dimensions.height !== this.videoOverlay.clientHeight){
                this.props.dispatch(setVideoDimensions({
                    width: this.videoOverlay.clientWidth,
                    height: this.videoOverlay.clientHeight,
                }));
            }
            return this.videoOverlay.clientHeight;
        } 
        return 200;
        
    }

    setupMotion = () => {
        if (this.videoOverlay) {
            this.heightCheck = this.videoOverlay.clientHeight;
            this.offscreenY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 110);
            this.minimizedY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 66);
        }
        console.log(this.heightCheck, this.offscreenY, this.minimizedY);
        // Styles that will be changed by motion
        let motionStyle = {};

        if (this.props.isOpen) {
            if (this.props.isMaximized) {
                motionStyle = { y: 0, scale: 1, opacity: 1 };
            } else {
                motionStyle = { y: this.minimizedY, scale: 0.5, opacity: 1 };
            }
        } else {
            motionStyle = { y: this.offscreenY, opacity: 0, scale: 1 };
        }
        this.setState({motionStyle: motionStyle});

        this.checkHeight();
    }

    heightCheck = 0;
    offscreenY = 320;
    minimizedY = 190;
    limit = 50;


    render() {
        const config = {
            stiffness: 90,
            damping: 15,
        };
        const playerStyles = {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
        };

        //Other styles
        let overlayStyle = {
            position: 'relative',
            height: 'auto',
            width: '100%',
        };
        const deviceHeight = window.innerHeight;
        const deviceWidth = window.innerWidth;
        const minWidth = Math.min(deviceHeight, deviceWidth);
        if (minWidth < 800) {
            if (this.props.orientation === Orientation.LANDSCAPE) {
                overlayStyle = {
                    position: 'fixed',
                    height: '100%',
                    width: deviceWidth,
                    minWidth: '100%',
                };
            } else {
                overlayStyle = {
                    position: 'fixed',
                    height: 'auto',
                    width: deviceWidth,
                    minWidth: '100%',
                };
            }
        }


        return (
            <Motion
              style={{
                  y: spring(this.state.motionStyle.y, config),
                  scale: spring(this.state.motionStyle.scale, config),
                  opacity: spring(this.state.motionStyle.opacity, config),
              }}
            >
                {({ y, scale, opacity }) => (
                    <div
                        className={'fs-overlay isOpen'}
                        ref={ref => (this.videoOverlay = ref)}
                        style={{
                            ...overlayStyle,
                            opacity,
                            transform: `translate3d(0, ${y}%, 0) scale3d(${scale}, ${scale}, 1)`,
                        }}
                        id="overlayDiv"
                    >
                    <div style={playerStyles} className={'IMRPlayer'} onScroll={this.onScroll} onTouchTap={this.onTouchTap} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                        {this.props.children}
                    </div>
                </div>)
}
            </Motion>
        );
    }
}

PlayerMotionController.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    orientation: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    orientation: state.settings.screenOrientation,
    videoOverlay: state.videoOverlay,
    videoPlayer: state.videoPlayer,
});

export default connect(mapStateToProps)(PlayerMotionController);
