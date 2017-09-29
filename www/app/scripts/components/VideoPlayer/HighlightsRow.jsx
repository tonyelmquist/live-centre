import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Close from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import HighlightItem from './HighlightItem';
import HorizontalScrollContainer from '../HorizontalScroll/HorizontalScrollContainer';
import ScrollItem from '../HorizontalScroll/ScrollItem';


class HighlightsRow extends Component {

    //Get all videos in the same category/tag
    getVideos = () => {
        const allVideos = this.props.allVideos;
        const videosInTag = this.props.tag.videos;

        return videosInTag.map((value) => {
            return (<ScrollItem
                id={allVideos[value].id}
                key={`highlights-${allVideos[value].id}`}
                img={allVideos[value].thumbnail}
                handleClick={() => this.props.onTileOpen(allVideos[value])}
            />)},
        );
    }


    render() {
        let highlightStyle = {};
        if (this.props.open) {
            highlightStyle = {
                bottom: '40px',
                opacity: 1,
            };
        } else {
            highlightStyle = {
                bottom: '-80%',
                opacity: 0,
            };
        }

        return (
            <div className="highlightsSlider slider" style={highlightStyle}>
                <div className="rowHeader">
                    <h3 style={{margin: '0 0 5px 10px', color: '#fff' }}>Recommendations</h3>
                </div>
                <HorizontalScrollContainer height={100}>
                    <div>{this.getVideos()}</div>
                </HorizontalScrollContainer>
                <FloatingActionButton
                    mini
                    secondary
                    onTouchTap={this.props.handleClose}
                    className="highlightsCloseButton"
                >
                    <Close />
                </FloatingActionButton>
            </div>
        );
    }
}

HighlightsRow.propTypes = {
    highlights: PropTypes.array.isRequired,
    videoUrl: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default HighlightsRow;
