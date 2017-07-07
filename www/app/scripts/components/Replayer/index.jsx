import React from 'react';
import PropTypes from 'prop-types';
import { Player as Video, ControlBar, CurrentTimeDisplay } from 'video-react';

const Replayer = props =>
  (<div className={`replayer ${props.open ? 'open' : ''}`}>
    <Video autoPlay playsInline muted startTime={props.timestamp}>
      <ControlBar autoHide disableDefaultControls>
        <CurrentTimeDisplay />
      </ControlBar>
      <source src={props.videoUrl} />
    </Video>
  </div>);

export default Replayer;
