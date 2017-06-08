import React, {Component} from 'react';
import Masonry from 'react-masonry-component';

class MasonryTiles extends Component {
    //https://masonry.desandro.com

    renderTiles = () =>
        this.props.videos.map((video)=>{

           // console.log("map",video);
           // console.log("filter", this.props.filter);

            if(!this.props.filter || this.filterVideo(this.props.filter, video)){
                console.log(true);
                return(
                    <div className="tile" key={video.assetid}>
                        <div className="masonry_tile_inner">
                            <img src={video.thumbnail}/>
                            <div className="tile-data">
                                <p>{video.title}</p>
                                <p className="metadata"> {video.category}, {video.company}</p>
                            </div>
                        </div>
                    </div>
                );
            }

        });

    //Looks at all metadata in video. 
    filterVideo(filter, video){

        for(let key in video){

            if(video[key].includes(filter)){
                return true;
            } 
        }
        return false;
    }

    render() {
        const masonryOptions = {
            itemSelector: '.tile',
            percentPosition: true,
            columnWidth: '.tile'
        };

        //console.log(this.props.videos);
        return (
                <Masonry
                    className={'masonry_tiles'}
                    options={masonryOptions}
                    //More options; https://github.com/eiriklv/react-masonry-component#basic-usage
                >
                    { this.props.videos
                      ? this.renderTiles()
                      : (<div></div>) }

                </Masonry>
        );
    };
};
/*
MasonryTiles.propTypes = {

};*/

export default MasonryTiles;
