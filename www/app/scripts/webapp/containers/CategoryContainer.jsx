/* global i18next*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { videoSelected } from '../../shared/actions/videoPlayer';
import { openVideoOverlay, maximizeVideoOverlay } from '../../shared/actions/videoOverlay';

import MasonryContainer from '../components/masonry/MasonryContainer';
import MasonryVideoTile from '../components/masonry/MasonryVideoTile';

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
        this.props.dispatch(openVideoOverlay());
        this.props.dispatch(maximizeVideoOverlay());
        this.props.dispatch(videoSelected(video));
    };

    handleTilePlay = (video) => {
        this.props.dispatch(openVideoOverlay());
        this.props.dispatch(maximizeVideoOverlay());
        this.props.dispatch(videoSelected(video));
    }

    // filter = () => {
    //     const categoryID = this.props.match.params.categoryKey;
    //     const tag = this.props.tags[categoryID];

    //     tag.videos.map((videoKey) => {
    //         videos.push(this.props.videos[videoKey]);
    //     });
    // }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

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

