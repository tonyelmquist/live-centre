import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoDescription from './VideoDescription';
import SeasonsFooter from './SeasonsFooter';
import Recommendations from './Recommendations';
import Chat from '../../components/Chat';
import { Orientation } from '../../constants/reduxConstants';

import { videoSelected, markAsWishlist, removeFromWishlist, markSelectedAsWishlist } from '../../actions/videoPlayer';
import { toggleCollapseInfo, collapseInfo } from '../../actions/VideoOverlay';

class ContentXInfo extends Component {

    onTileOpen = (video) => {
        this.props.dispatch(videoSelected(video));
    }
    
    collapseInfo = () => {
        this.props.dispatch(collapseInfo());
    }

    toggleCollapseInfo = () => {
        this.props.dispatch(toggleCollapseInfo());
    }

    onMessageSend = (message) => {
        FirebaseDB.writeMessageToChannel(message);
    }

    handleAddToWishlist = (videoId) => {
        this.props.dispatch(markAsWishlist(videoId, true));
        this.props.dispatch(markSelectedAsWishlist(true));
    }
    handleRemoveFromWishlist = (videoId) => {
        this.props.dispatch(markAsWishlist(videoId, false));
        this.props.dispatch(markSelectedAsWishlist(false));
    }


    render() {
        const video = this.props.video;

        const renderFooter = () => {
            if (video.series !== undefined && video.season !== undefined) {
                return (<SeasonsFooter
                          video={this.props.video}
                          allVideos={this.props.allVideos}
                          series={this.props.series}
                          seasons={this.props.seasons}
                          onTileOpen={this.onTileOpen}
                />);
            } else if (video.live) {
                return <p>Chat</p>;
            }
            return (<Recommendations
                      video={this.props.video}
                      series={this.props.series}
                      tags={this.props.tags}
                      allVideos={this.props.allVideos}
                      onTileOpen={this.onTileOpen}
                    />);
        };

        return (
            <div className={'content-x-info'}>
                {video.tags === 'Street Fighter'
                ? (
                    <Chat
                        messages={this.props.chat.messages}
                        onMessageSend={this.onMessageSend}
                        showChatTitle={this.props.playback.controlBarVisibility}
                        video={video}
                        isLoggedIn={this.props.authentication.isLoggedIn}
                    />)
                : (<VideoDescription
                        video={video}
                        collapseInfo={this.collapseInfo}
                        toggleCollapseInfo={this.toggleCollapseInfo}
                        isCollapsed={this.props.videoOverlay.collapsedInfo}
                        handleAddToWishlist={this.handleAddToWishlist}
                        handleRemoveFromWishlist={this.handleRemoveFromWishlist}
                />)
                }
                {video.tags === 'Street Fighter'
                ? <div />
                : renderFooter()}

            </div>
        );
    }
}

ContentXInfo.propTypes = {
    dispatch: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    videoOverlay: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    seasons: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired,
    allVideos: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
    videoPlayerDimensions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    settings: state.settings,
    videoOverlay: state.videoOverlay,
    playback: state.playback,
    chat: state.chat,
    seasons: state.seasons,
    series: state.series,
    allVideos: state.videos,
    tags: state.tags,
    authentication: state.authentication,
    videoPlayerDimensions: state.videoPlayer.dimensions,
});

export default connect(mapStateToProps)(ContentXInfo);
