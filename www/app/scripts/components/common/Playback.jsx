import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../containers/Player';


function Playback(props) {
    console.log('Reached playback with', props.videoUrl);
    return (
        <div>
            <Player videoUrl={props.videoUrl} />
        </div>);
}

Playback.defaultProps = {
    videoUrl: '',
};

Playback.propTypes = {
    videoUrl: PropTypes.string,
};

export default Playback;
