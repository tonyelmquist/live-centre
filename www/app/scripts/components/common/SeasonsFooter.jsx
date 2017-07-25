import React from 'react';
import PropTypes from 'prop-types';
import CirclesRow from '../horizontal-scroll/CirclesRow';
import ScrollItem from '../horizontal-scroll/ScrollItem';

const SeasonsFooter = (props) => {
    const currentSeason = props.video.series;
    const seasonsList = props.series.items[currentSeason].seasons;
    const seasons = props.seasons.items;
    const currentSeasonTab = 0;
    const allVideos = props.videos.items;


    const getSeasonsTabs = () => {
        return seasonsList.map((value, key) =>
            <p key={`seasons-tab-${value}`}>Season: {key + 1}</p>,
            //Onclick change current season tab.. 
        );
       // return seasons;
    };

    const getEpisodes = () => {
        const currentSeasonKey = seasonsList[currentSeasonTab];

        return seasons[currentSeasonKey].episodes.map((value, key) =>
            (<ScrollItem
                img={allVideos[value].thumbnail}
                key={`episode-${allVideos[value].title}`}
            />),
        //<img className="image" src={allVideos[value].thumbnail} alt={`episode-${allVideos[value].title}`} />,
        );
    };

    return (
        <div>
            {getSeasonsTabs()}
            <CirclesRow>
                {getEpisodes()}
            </CirclesRow>
      </div>
    );
};

SeasonsFooter.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    series: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SeasonsFooter;
