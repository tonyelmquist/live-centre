import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

/*  Uses masonry tiles from https://masonry.desandro.com 
    react version: https://github.com/eiriklv/react-masonry-component#basic-usage
    
    This component takes in an array of videos and returns a div with tiles, 
    they will float and align properly even with different heights. 
    If it recieves a filter as prop it will filter the array based on the tiles. 
*/
class MasonryTiles extends Component {
    //

    renderTiles = () =>
        this.props.videos.map((video)=>{

            //If a filter string is not present show the tile, if not, try to match the filter
            if(!this.props.filter.length > 0 || this.matchWithFilters(this.props.filter, video)){
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

    //Looks at _all_ metadata in video. 
    //Compare to all strings in filter array. 
    matchWithFilters(filter, video){

        for(const key in video){
            for(let i = 0; i<filter.length; i++){
                
                let filterString = filter[i].toLowerCase();
                let videoString = video[key].toLowerCase();

                if(videoString.includes(filterString) && filterString.length>0){
                    return true;
                } 
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

MasonryTiles.propTypes = {
    videos : PropTypes.array.isRequired,
    filter : PropTypes.array.isRequired
};

export default MasonryTiles;
