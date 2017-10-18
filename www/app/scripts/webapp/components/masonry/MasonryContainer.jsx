import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import Spinner from '../Icons/Spinner';

/*
    This component takes in an array of videos and returns a div with tiles,
    they will float and align properly even with different heights.
    If it recieves a filter as prop it will filter the array based on the tiles.

    Uses masonry tiles from https://masonry.desandro.com
    react version: https://github.com/eiriklv/react-masonry-component#basic-usage
*/

class MasonryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowing: false,
        }
    }
    masonryOptions = {
        itemSelector: '.tile',
        percentPosition: true,
        columnWidth: '.tile',
        //stagger: 20,
    };

    handleImagesLoaded = () => {
        if (!this.state.isShowing) {
            this.setState({
                isShowing: true,
            });
        }
    };

    render() {
        const style = {
            transition: '.2s opacity',
            opacity: this.state.isShowing ? 1 : 0,
        };

        const spinnerStyle  = {
            transition: '.2s opacity',
            opacity: this.state.isShowing ? 0 : 0.9,
        };

        return (
        <div>
            <Spinner style={spinnerStyle} />
            <Masonry // More options; https://masonry.desandro.com/options.html
                className={'masonry_tiles'}
                style={style}
                options={this.masonryOptions}
                onImagesLoaded={this.handleImagesLoaded}
            >
                { this.props.children }

            </Masonry>
        </div>
        );
    }
}

MasonryContainer.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
};

MasonryContainer.defaultProps = {
    filter: [],
    handlefilter: false,
    size: "medium",
};

export default MasonryContainer;
