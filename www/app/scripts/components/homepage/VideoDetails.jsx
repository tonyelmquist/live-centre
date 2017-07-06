import React from 'react';
import PropTypes from 'prop-types';

const VideoDetails = ({ video }) => (
  <div>{video}</div>
);

VideoDetails.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VideoDetails;
