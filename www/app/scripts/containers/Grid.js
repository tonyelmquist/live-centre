import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, Row} from 'react-flexbox-grid';
import Player from './Player';


import {changeScore} from '../actions/score';
import CategoryRow from '../components/CategoryRow';

class HomeGrid extends Component {

    createVideoList = () => {

        const categories = [...new Set(this.props.videos.map((item) => item.category))].filter(Boolean);

        return categories.map((category) => (
            <CategoryRow key={category}
                category={category}
                videos={this
                .props
                .videos
                .filter((video) => {
                    return video.category === category;
                })}></CategoryRow>
        ));
    }
    render() {
        return (
            <div>
                {this.props.selected && <Player videoUrl={this.props.videoUrl}/>}
                {this.createVideoList()}
            </div>
        );
    }
}

HomeGrid.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoUrl: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    videos: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        videoUrl: state.playback.url, 
        selected: state.playback.isSelected, 
        videos: state.videos.items
    };
};

export default connect(mapStateToProps)(HomeGrid);
