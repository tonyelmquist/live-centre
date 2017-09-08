import React from 'react';
import PropTypes from 'prop-types';
import { Player as Video, ControlBar, CurrentTimeDisplay } from 'video-react';

const Replayer = (props) => {
    if (props.open) {
        return (<div className={`replayer ${props.open ? 'open' : ''}`}>
          <Video autoPlay playsInline muted startTime={props.timestamp}>
            <ControlBar autoHide disableDefaultControls>
              <CurrentTimeDisplay />
            </ControlBar>
            <source src={props.videoUrl} />
          </Video>
        </div>);
    } return (<div />);
};

export default Replayer;
