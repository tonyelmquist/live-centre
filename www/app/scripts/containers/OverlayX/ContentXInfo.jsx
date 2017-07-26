import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoDescription from '../../components/common/VideoDescription';
import SeasonsFooter from '../../components/common/SeasonsFooter';
import Recommendations from '../../components/common/Recommendations';
import Chat from '../../components/Chat';

class ContentXInfo extends Component {
    // shouldComponentUpdate(nextProps) {
    //     //only if this is a new video do update. 
    //     const toggle = nextProps.video.id !== this.props.video.id || nextProps.collapseInfo !== this.props.collapseInfo;
    //     console.log("toggle?", toggle);
    //     return toggle
    // }

    render() {
        const video = this.props.video;
        console.log("VIDEO", video);
        console.log(this.props);
        
        const renderFooter = () => {
            if(video.series !== undefined){
                return (<SeasonsFooter
                          video={this.props.video}
                          videos={this.props.allVideos}
                          series={this.props.series}
                          seasons={this.props.seasons}
                        />);
            } else if(video.live){
                return <p>Chat</p>
            }
            return (<Recommendations 
                      video={this.props.video} 
                      series={this.props.series} 
                    />);
        }
        console.log(video);

        return (
            <div className={`content-x-info`}>
                {video.tags == "Street Fighter"
                ? (<Chat messages={this.props.messages} 
                        onMessageSend={this.props.onMessageSend}/>)
                : (<VideoDescription video={video}                             
                        collapseInfo={this.props.collapseInfo}
                        toggleCollapseInfo={this.props.toggleCollapseInfo}
                        isCollapsed={this.props.isCollapsed}/>)
                }
                {video.tags == "Street Fighter"
                ? <div />
                : renderFooter()}
                
            </div>
        );
    }
}

ContentXInfo.propTypes = {
    video: PropTypes.object,
};

export default ContentXInfo;


    //   <VideoDescription video={props.video.item} />
    //   {props.video.item.series === undefined
    //     ? <Recommendations video={props.video.item} series={props.series} />
    //     : <SeasonsFooter
    //         video={props.video.item}
    //         videos={props.videos}
    //         series={props.series}
    //         seasons={props.seasons}
    //     />
    //   }