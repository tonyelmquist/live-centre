import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentXInfo extends Component {
    render() {
       // console.log("Video?,", props.video);
        return (
            <div className={`content-x-info`}>
                info
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