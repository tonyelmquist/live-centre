import React from 'react';
import PropTypes from 'prop-types';
import FullStar from 'material-ui/svg-icons/toggle/star';
// import BorderStar from 'material-ui/svg-icons/toggle/star-border';
// import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import { yellow500 } from 'material-ui/styles/colors';
import Collapsible from './Collapsible';

const VideoDescription = ({ video, collapseInfo, toggleCollapseInfo, isCollapsed }) => {
    const starStyle = {
      verticalAlign: 'top',
      height: 20,
    }
    const renderStars = () => {
        return (
          <span>
            <FullStar style={starStyle} color={yellow500} />
            <FullStar style={starStyle} color={yellow500} />
            <FullStar style={starStyle} color={yellow500} />
            <FullStar style={starStyle} color={yellow500} />
            <FullStar style={starStyle} color={yellow500} />
          </span>
        );
    };

    const title = video.series ? video.series : video.title
    const subtitle = video.series ? `${video.title}, season ${video.season}` : ""
    const ipsum = `Morbi eu scelerisque justo. Sed finibus, tortor eu viverra fringilla, 
    lectus sem condimentum mi, tempus tincidunt mauris dolor tempor 
    nibh. Vestibulum quis convallis urna. Mauris massa lectus, 
    convallis in mi id, blandit suscipit turpis. Integer egestas 
    risus sodales dui euismod, quis auctor ex tincidunt. `;

    return (
      <Collapsible  
        label={title}          
        collapseInfo={collapseInfo}
        toggleCollapseInfo={toggleCollapseInfo}
        isCollapsed={isCollapsed}
      >        
        <p>{subtitle}
        Duration: {Math.round(45)} min<br/>
        Star Rating: {renderStars()}</p>
        <p>{ipsum}</p>
      </Collapsible>
    );
};


VideoDescription.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
