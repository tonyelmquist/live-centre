import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
//import { Player as Video, ControlBar, CurrentTimeDisplay } from 'video-react';

const Replayer = (props) => {
    if (props.open) {
        return <div className={`replayer ${props.open ? 'open' : ''}`}>
                    <VideoPlayer startTime={props.timestamp} muted autoPlay source={props.videoUrl} />
                </div>
    }
    return (<div className="closedReplayer"/>);
};

export default Replayer;
