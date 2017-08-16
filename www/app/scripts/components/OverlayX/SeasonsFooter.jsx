import React from 'react';
import PropTypes from 'prop-types';
import HorizontalScrollContainer from '../HorizontalScroll/HorizontalScrollContainer';
import ScrollItem from '../HorizontalScroll/ScrollItem';
import FilterTabs from '../../containers/FilterTabs';
import i18next from 'i18next';

const SeasonsFooter = (props) => {
    const currentSeason = props.video.series;
    const seasonsList = props.series.items[currentSeason].seasons;
    const seasons = props.seasons.items;
    const currentSeasonTab = 0;
    const allVideos = props.allVideos.items;


    const getSeasonsTabs = () => {
        const seasons = seasonsList.map((value, key) =>
            `${i18next.t('video_season')  } ${key + 1}` ,
            //TODO: Onclick change current season tab.. 
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
                key={`episode-${allVideos[value].id}`}
                id={allVideos[value].id}
                handleClick={() => props.onTileOpen(allVideos[value])}
            />),
        //<img className="image" src={allVideos[value].thumbnail} alt={`episode-${allVideos[value].title}`} />,
        );
    };

    return (
        <div>
            {getSeasonsTabs()}
            <div className="video-scroller">
                <HorizontalScrollContainer>
                    {getEpisodes()}
                </HorizontalScrollContainer>
            </div>
        </div>
    );
};

SeasonsFooter.propTypes = {
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    series: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SeasonsFooter;
