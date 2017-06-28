import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from '../../containers/Player';


const Playback = ({ videoUrl }) => (
  <div>
    <Player videoUrl={videoUrl} />
  </div>
    );

Playback.propTypes = {
    videoUrl: PropTypes.string,
};

export default Playback;
