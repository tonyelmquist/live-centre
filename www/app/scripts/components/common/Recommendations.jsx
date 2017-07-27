import React from 'react';
import PropTypes from 'prop-types';
import CirclesRow from '../horizontal-scroll/CirclesRow';
import ScrollItem from '../horizontal-scroll/ScrollItem';

//Recommendation based on tag. 
const Recommendations = (props) => {
    const allVideos = props.allVideos.items;
    const tags = props.tags.items;
    const video = props.video;

    const getVideos = () => {
        const currentVideoTag = video.tags;
        const recommendedVideos = tags[currentVideoTag].videos;

        return recommendedVideos.map((value) =>
            (<ScrollItem
                img={allVideos[value].thumbnail}
                key={`episode-${allVideos[value].title}`}
                handleClick={() => props.onTileOpen(allVideos[value])}
            />),
        );
    };
    

    return (
      <span>
        <h4 style={{ padding: '15px 20px' }}>Recommendations:</h4>
            <CirclesRow>
                <div>{getVideos()}</div>
            </CirclesRow>
        </span>
    );
};

Recommendations.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Recommendations;