import React from 'react';
import PropTypes from 'prop-types';
import FullStar from 'material-ui/svg-icons/toggle/star';
// import BorderStar from 'material-ui/svg-icons/toggle/star-border';
// import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import { yellow500 } from 'material-ui/styles/colors';
import Collapsible from './Collapsible';

const VideoDescription = ({ video, collapseInfo, toggleCollapseInfo, isCollapsed }) => {
    const renderStars = () => {
        return (
          <div className="inline">
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
          </div>
        );
    };



    return (
      <Collapsible  
        label={video.series}          
        collapseInfo={collapseInfo}
        toggleCollapseInfo={toggleCollapseInfo}
        isCollapsed={isCollapsed}
      >        
        <h3>{video.title}, Season {video.season}</h3>
        <span>Duration: {Math.round(45)} min</span>
        <div>Star Rating: {renderStars()}</div>
        <p>{video.description}</p>
      </Collapsible>
    );
};


VideoDescription.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
