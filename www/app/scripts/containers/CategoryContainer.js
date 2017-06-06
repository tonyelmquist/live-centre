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
    _handleSelect = (assetid) => {
        this.props.dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    };

    render() {
        return (
            <div>
                <div className='category'>
                    <Link to='/Home'>
                        <div className='item'><IconButton style={styles.medium} iconStyle={styles.mediumIcon}><BackButton color={blueGrey900}/></IconButton></div>
                    </Link>
                    <h2 className='item'>{this.props.match.params.categoryKey}</h2>
                </div>
                <VideoGrid
                    videos={this.props.videos[this.props.match.params.categoryKey]}
                    category={this.props.match.params.categoryKey}
                    onSelect={this._handleSelect}
                />
            </div>
        );
    };
};

CategoryContainer.propTypes = {
    videos : PropTypes.object.isRequired,
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    videos: state.videos.items
});

export default connect(mapStateToProps)(CategoryContainer);
