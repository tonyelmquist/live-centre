import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoDescription from './VideoDescription';
import SeasonsFooter from './SeasonsFooter';
import Recommendations from './Recommendations';
import Chat from '../../components/Chat';

class ContentXInfo extends Component {
    shouldComponentUpdate(nextProps) {
        //only if this is a new video do update.
        if (nextProps.video.id !== this.props.video.id) {
            return true
        } else if (nextProps.isCollapsed !== this.props.isCollapsed) {
            return true 
        }
        //toggle = nextProps.video.id !== this.props.video.id || nextProps.toggleCollapseInfo !== this.props.toggleCollapseInfo;
        return false
    }

    render() {
        const video = this.props.video;

        const renderFooter = () => {
            if (video.series !== undefined) {
                return (<SeasonsFooter
                          video={this.props.video}
                          allVideos={this.props.allVideos}
                          series={this.props.series}
                          seasons={this.props.seasons}
                          onTileOpen={this.props.onTileOpen}
                />);
            } else if (video.live) {
                return <p>Chat</p>;
            }
            return (<Recommendations
                      video={this.props.video}
                      series={this.props.series}
                      tags={this.props.tags}
                      allVideos={this.props.allVideos}
                      onTileOpen={this.props.onTileOpen}
                    />);
        };

        console.log('ContentXInfo rerender', video);
        return (
            <div className={'content-x-info'}>
                {video.tags == 'Street Fighter'
                ? (<Chat
                        messages={this.props.messages}
                        onMessageSend={this.props.onMessageSend}
                />)
                : (<VideoDescription
                        video={video}
                        collapseInfo={this.props.collapseInfo}
                        toggleCollapseInfo={this.props.toggleCollapseInfo}
                        isCollapsed={this.props.isCollapsed}
                        handleAddToWishlist={this.props.handleAddToWishlist}
                />)
                }
                {video.tags == 'Street Fighter'
                ? <div />
                : renderFooter()}

            </div>
        );
    }
}

ContentXInfo.propTypes = {
    video: PropTypes.object,
    handleAddToWishlist: PropTypes.func,
};

export default ContentXInfo;
