import React from 'react';
import PropTypes from 'prop-types';
import CirclesRow from '../horizontal-scroll/CirclesRow';
import ScrollItem from '../horizontal-scroll/ScrollItem';
import FilterTabs from '../../components/horizontal-scroll/FilterTabs';

const SeasonsFooter = (props) => {
    const currentSeason = props.video.series;
    const seasonsList = props.series.items[currentSeason].seasons;
    const seasons = props.seasons.items;
    const currentSeasonTab = 0;
    const allVideos = props.allVideos.items;


    const getSeasonsTabs = () => {
        const seasons = seasonsList.map((value, key) =>
            `Season: ${key + 1}`,
            //Onclick change current season tab.. 
        );
        return (<FilterTabs
            tabItems={seasons}
            activeTab={0}
            //changeTab={this.changeTab}
            colortheme="dark"
        />);
       // return seasons;
    };

    const getEpisodes = () => {
        const currentSeasonKey = seasonsList[currentSeasonTab];

        return seasons[currentSeasonKey].episodes.map((value, key) =>
            (<ScrollItem
                img={allVideos[value].thumbnail}
                key={`episode-${allVideos[value].title}`}
                handleClick={() => props.onTileOpen(allVideos[value])}
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
