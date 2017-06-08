import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Player from '../../containers/Player';


const Playback = ({videoUrl}) => {
    return (
        <div>
            <Player videoUrl={videoUrl}/>
        </div>
    );
};

Playback.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    videoUrl: PropTypes.string
};

export default Playback;
