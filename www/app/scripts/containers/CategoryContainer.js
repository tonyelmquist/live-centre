import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VideoGrid from '../components/common/VideoGrid';
import { videoSelected } from '../actions/video';
import { NavLink, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { fullWhite, blueGrey900 } from 'material-ui/styles/colors';
import { videoPrefix } from '../constants/mediaPrefix.js';
// import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';


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
    _handleSelect = (videoUrl) => {
        this.props.dispatch(videoSelected(`${videoPrefix+videoUrl}`));
    };


    render() {
        const videos = [];
        const categoryID = this.props.match.params.categoryKey;
        const tag = this.props.tags[categoryID];


        tag.videos.map((videoKey)=>{
            videos.push(this.props.videos[videoKey]);
        });

        return (
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
        );
    }
}

CategoryContainer.propTypes = {
    videos : PropTypes.object.isRequired,
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(CategoryContainer);
