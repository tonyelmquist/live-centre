import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { videoPrefix } from '../../constants/mediaPrefix.js';
import MasonryVideos from '../../components/common/MasonryVideos';
import MasonryVideoTile from '../../components/common/MasonryVideoTile';
import { videoSelected } from '../../actions/video';
import { showOverlay } from '../../actions/overlay';
import { showVideoCard, changeVideoInfo } from '../../actions/videoCard';
import CardContainer from '../homepage/CardContainer';
class SeriesPage extends React.Component {

    handleTileOpen = (video) => {
        this.props.dispatch(changeVideoInfo(video));
        //this.props.dispatch(changeCardCategory(category));
        this.props.dispatch(showVideoCard());
    }

    handleTilePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }



    //Use the first episode in each series to make a thumbnail
    episodeList = () => {
      let episodes = [];
      //this.props.series
      const series = this.props.series;
      const seasons = this.props.seasons;
      const videos = this.props.videos;
      for(const key in series){
        const seasonKey = series[key].firstSeason; //first season of series.
        const videoKey = seasons[seasonKey].firstEpisode;
        const video = videos[videoKey];

        episodes.push(video);

      }
      return episodes;
    };
    render() {
      //console.log(this.props);
        return (
          <div className="slide">
            <div className="container-fluid">
            <h1>Series</h1>
            <p>First epsiode for all the series. Opening them will show the videocard; which also contains the rest of the episodes.</p>

            <CardContainer />
            <MasonryVideos>
                <MasonryVideoTile
                  //filter={this.filter}
                  videos={this.episodeList()}
                  handleTileOpen={this.handleTileOpen}
                  handleTilePlay={this.handleTilePlay}
                />
            </MasonryVideos>
            </div>
          </div>
        );
    }
}

SeriesPage.propTypes = {
    videos : PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    series: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    videos: state.videos.items,
    series: state.series.items,
    seasons: state.seasons.items,
});

export default connect(mapStateToProps)(SeriesPage);