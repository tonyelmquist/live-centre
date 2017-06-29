import React from 'react';
import PropTypes from 'prop-types';

const VideoOverview = ({ video }) => (
  <div>{video}</div>
);

VideoOverview.propTypes = {
    video: PropTypes.object.isRequired,
};

export default VideoOverview;
