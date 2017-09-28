import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import VideoPlayer from './VideoPlayer';
import Spinner from '../../components/Icons/Spinner';
// import { Player as Video, ControlBar, CurrentTimeDisplay } from 'video-react';

class Replayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            readyToPlay: false,
        };
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.videoUrl !== this.props.videoUrl
            || nextProps.open !== this.props.open
            || nextProps.timestamp !== this.props.timestamp
            || nextState.readyToPlay !== this.state.readyToPlay) {
            return true;
        }
        return false;
    }

    componentDidUpdate = () => {
        if (this.replayerVideo) {
            this.replayerVideo.video.load();
            this.replayerVideo.video.addEventListener('playing', () => {
                console.log('REPLAY READY TO PLAY');
                this.setState({
                    readyToPlay: true,
                });
                setTimeout(() => {
                    console.log('HIDE');
                    this.props.hideReplay();
                    this.setState({
                        readyToPlay: false,
                    });
                }, 12000);
            }, { once: true });
        }
    };

    render() {
        let replayerLoaderStyles = {};
        if (this.state.readyToPlay) {
            replayerLoaderStyles.display = 'none';
        } else {
            replayerLoaderStyles = {
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'black',
                zIndex: 2500,
            };
        }
        return (<div className={`replayer ${this.props.open ? 'open' : ''}`}>
                    <div className="replayer-loader" style={replayerLoaderStyles}>
                        <Spinner style={{ color: 'white', top: '50%' }} />
                    </div>
                    <FontAwesome
                        className="close-button"
                        name="close"
                        size="2x"
                        style={{ position: 'absolute', right: '10px', top: '5px', zIndex: 3000 }}
                        onTouchTap={() => this.props.hideReplay()}
                    />
                    <VideoPlayer startTime={this.props.timestamp} muted autoPlay source={this.props.videoUrl} ref={ref => (this.replayerVideo = ref)}/>
                </div>);
    }
}

export default Replayer;
