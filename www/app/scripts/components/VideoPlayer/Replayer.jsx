import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import FontAwesome from 'react-fontawesome';
//import { Player as Video, ControlBar, CurrentTimeDisplay } from 'video-react';

const Replayer = (props) => {
    if (props.open) {
        return <div className={`replayer ${props.open ? 'open' : ''}`}>
                    <FontAwesome
                        className="close-button"
                        name="close"
                        size="2x"
                        style={{ position: 'absolute', right: '10px', top: '5px', zIndex: 3000 }}
                        onTouchTap={() => props.hideReplay()}
                    />
                    <VideoPlayer startTime={props.timestamp} muted autoPlay source={props.videoUrl} />
                </div>
    }
    return (<div className="closedReplayer"/>);
};

export default Replayer;
