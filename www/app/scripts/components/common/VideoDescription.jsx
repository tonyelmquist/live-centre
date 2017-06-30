import React from 'react';
import PropTypes from 'prop-types';
import FullStar from 'material-ui/svg-icons/toggle/star';
import BorderStar from 'material-ui/svg-icons/toggle/star-border';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import { yellow500 } from 'material-ui/styles/colors';

const VideoDescription = ({ video }) => {
    // const info = props.video.data;
    const maxStars = 5;
    const renderStars = () => {
        /*const stars = new Array(5);
        for (let i = 0; i < maxStars; i + 1) {
            const diff = maxStars - i;
            if (diff >= 1) {
                stars.push(<FullStar key={i} color={yellow500} />);
            } else if (diff >= 0) {
                stars.push(<HalfStar key={i} color={yellow500} />);
            } else {
                stars.push(<BorderStar key={i} color={yellow500} />);
            }
        }
        
        return stars;*/
        return (
          <div>
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
            <FullStar color={yellow500} />
          </div>
        );

        
    };

    return (
      <div className="description">
        {/* {
                props.title.length > 32 ? <h2>{props.title}</h2> : <h3>{props.title}</h3>
            } */}
        <h1>{video.title}</h1>
        <h3>Episode Title</h3>
        <span>Duration: {Math.round(45)} min</span>
        <div>{renderStars()}</div>
        <h3>Description</h3>
        <p>{video.description}</p>
      </div>
    );
};


VideoDescription.propTypes = {
    video: PropTypes.object.isRequired,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
