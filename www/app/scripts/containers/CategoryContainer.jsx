/* global i18next*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { videoSelected, resetCurrentTimeInPlayer } from '../actions/videoPlayer';
import { openOverlayX,maximizeOverlayX } from '../actions/overlayX';

import MasonryContainer from '../components/Masonry/MasonryContainer';
import MasonryVideoTile from '../components/Masonry/MasonryVideoTile';

const styles = {
    mediumIcon: {
        width: 32,
        height: 32,
    },
    medium: {
        width: 64,
        height: 64,
        padding: 18,
    },
};
class CategoryContainer extends Component {
    handleTileOpen = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    };

    handleTilePlay = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }

    // filter = () => {
    //     const categoryID = this.props.match.params.categoryKey;
    //     const tag = this.props.tags[categoryID];

    //     tag.videos.map((videoKey) => {
    //         videos.push(this.props.videos[videoKey]);
    //     });
    // }

    render() {
        const videos = [];
        const categoryID = this.props.match.params.categoryKey;
        const tag = this.props.tags[categoryID];


        tag.videos.map((videoKey) => {
            videos.push(this.props.videos[videoKey]);
        });

        return (
          <div className="container-fluid">
            <MasonryContainer>
            <MasonryVideoTile
                // filter={this.filter}
                videos={videos}
                handleTileOpen={this._handleSelect}
                handleTilePlay={this.handleTilePlay}
            />
            </MasonryContainer>
          </div>
        );
    }
}

CategoryContainer.propTypes = {
    videos: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(CategoryContainer);

