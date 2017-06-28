import React from 'react';
import PropTypes from 'prop-types';
import FullStar from 'material-ui/svg-icons/toggle/star';
import BorderStar from 'material-ui/svg-icons/toggle/star-border';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import { yellow500 } from 'material-ui/styles/colors';

const VideoDescription = ({ video }) => {
    // const info = props.video.data;
    const max_stars = 5;
    const _renderStars = () => {
        const stars = new Array(5);
        for (let i = 0; i < max_stars; i++) {
            const diff = max_stars - i;
            if (diff >= 1) {
                stars.push(<FullStar key={i} color={yellow500} />);
            } else if (diff >= 0) {
                stars.push(<HalfStar key={i} color={yellow500} />);
            } else {
                stars.push(<BorderStar key={i} color={yellow500} />);
            }
        }

        return stars;
    };

    return (
      <div className="description">
        {/* {
                props.title.length > 32 ? <h2>{props.title}</h2> : <h3>{props.title}</h3>
            } */}
        <h1>{video._title}</h1>
        <h3>Episode Title</h3>
        <span>Duration: {Math.round(45)} min</span>
        <div>{_renderStars()}</div>
        <h3>Description</h3>
        <p>{video._description}</p>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
      </div>
    );
};


VideoDescription.propTypes = {
    video: PropTypes.object.isRequired,
    // stars: PropTypes.string.isRequired
};

export default VideoDescription;
