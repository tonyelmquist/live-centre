import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import HorizontalScrollContainer from '../HorizontalScroll/HorizontalScrollContainer';
import ScrollItem from '../HorizontalScroll/ScrollItem';

//Recommendation based on tag. 
const Recommendations = (props) => {
    const allVideos = props.allVideos.items;
    const tags = props.tags.items;
    const video = props.video;

    const getVideos = () => {
        const currentVideoTag = video.tags;
        const recommendedVideos = tags[currentVideoTag].videos;

        return recommendedVideos.map((value) => {
            return (<ScrollItem
                id={allVideos[value].id}
                key={`recommendedVideos-${allVideos[value].id}`}
                img={allVideos[value].thumbnail}
                handleClick={() => props.onTileOpen(allVideos[value])}
            />)},
        );
    };
    

    return (
      <div className="video-scroller">
        <h4 style={{ padding: '20px 0 5px 15px', fontWeight: 'bold' }}>{i18next.t('video_recommendations')}</h4>
            <HorizontalScrollContainer>
                <div>{getVideos()}</div>
            </HorizontalScrollContainer>
        </div>
    );
};

Recommendations.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Recommendations;