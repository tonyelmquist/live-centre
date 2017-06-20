import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import VideoGrid from '../components/common/VideoGrid';
import {videoSelected} from '../actions/video';
import {NavLink, Link} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/hardware/keyboard-backspace';
import {fullWhite, blueGrey900} from 'material-ui/styles/colors';
// import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';


const styles = {
    mediumIcon: {
        width: 32,
        height: 32
    },
    medium: {
        width: 64,
        height: 64,
        padding: 18
    }
};
class CategoryContainer extends Component {
    _handleSelect = (videoUrl) => {
        this.props.dispatch(videoSelected(`http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/video-files/${videoUrl}`));
    };



    render() {

        let videos = [];

        const categoryID = this.props.match.params.categoryKey;

        let currentTag = {};
        
        //Get tag object
        if(this.props.tags && categoryID){

            this.props.tags.filter((tag) =>{
                if(tag.id == categoryID){
                    currentTag = tag;
                }
            });

        }
    
        //Get video based on category
        if (categoryID) {
            videos = this.props.videos.filter((video) =>{

                for(let i = 0; i<video.tags.length; i++){
                    if(video.tags[i].id == categoryID){
                        return video;
                    }
                }
            });

        }

        return (
            <div>
                <div className='category'>
                    <Link to='/Home'>
                        <div className='item'><IconButton style={styles.medium} iconStyle={styles.mediumIcon}><BackButton color={blueGrey900}/></IconButton></div>
                    </Link>
                    <h2 className='item'>{currentTag.name}</h2>
                </div>

                <VideoGrid
                    videos={videos}
                    category={categoryID}
                    onSelect={this._handleSelect}
                />
            </div>
        );
    };
};

CategoryContainer.propTypes = {
    videos : PropTypes.array.isRequired,
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
    videos: state.videos.items,
    tags: state.tags.items
});

export default connect(mapStateToProps)(CategoryContainer);
