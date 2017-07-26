import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import VideoGrid from '../components/common/VideoGrid';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { blueGrey900 } from 'material-ui/styles/colors';
import { videoSelected } from '../actions/video';
import videoPrefix from '../constants/mediaPrefix';
// import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';
import { showOverlay } from '../actions/overlay';
import { openOverlayX, maximizeOverlayX, resetCurrentTimeInOverlayX } from '../actions/overlayX';

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
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInOverlayX());
    };

    handleTilePlay = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInOverlayX());
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
/*

<div>
            <div className='category'>
                <Link to='/Home'>
                    <div className='item'><IconButton style={styles.medium} iconStyle={styles.mediumIcon}><BackButton color={blueGrey900}/></IconButton></div>
                </Link>
                <h2 className='item'>{categoryID}</h2>
            </div>

            <VideoGrid
              videos={videos}
              category={categoryID}
              onSelect={this._handleSelect}
            />
        </div>

 */
