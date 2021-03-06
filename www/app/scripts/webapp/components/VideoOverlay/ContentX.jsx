import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import ContentXInfo from './ContentXInfo';

class ContentX extends Component {

    

                    
                         <ContentXInfo 
                            video={this.props.video}
                            allVideos={this.props.allVideos}
                            series={this.props.series}
                            seasons={this.props.seasons}
                            tags={this.props.tags}
                            collapseInfo={this.props.collapseInfo}
                            toggleCollapseInfo={this.props.toggleCollapseInfo}
                            isCollapsed={this.props.isCollapsed}
                            messages={this.props.chat} 
                            onMessageSend={this.props.onMessageSend}
                            onTileOpen={this.props.onTileOpen}
                            handleAddToWishlist={() => this.props.handleAddToWishlist(this.props.video.id)}
                            handleRemoveFromWishlist={() => this.props.handleRemoveFromWishlist(this.props.video.id)}
                            isControlBarVisible={this.props.isControlBarVisible}
                            isLoggedIn={this.props.isLoggedIn}
                        /> 
                    </div>)
                }
            </Motion>
        );
    }
}

ContentX.propTypes = {
    chat: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default ContentX;
