import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../containers/Player';


function Playback(props) {
    return (
            <Player videoUrl={props.videoUrl} />);
}

Playback.defaultProps = {
    videoUrl: '',
};

Playback.propTypes = {
    videoUrl: PropTypes.string,
};

export default Playback;
