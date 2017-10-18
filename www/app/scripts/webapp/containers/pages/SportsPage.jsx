import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import Path from 'path';
import soccer from '../../../../img/mockup/sport/soccer.png';
import i18next from 'i18next';

class SportsPage extends React.Component {

    changeRoute = path => this.props.history.push(path);

    filterTile = () => {
        console.log('filter');
    }

    handleOnClick = (item) => {
        console.log('handleclick:', item);
        this.changeRoute(`/Sport/${item.key}`);
    }

    getTiles = () => {
        const tiles = [];
        const sports = this.props.sportsInfo.sports;
        console.log(sports);
        console.log(sports['Soccer'].thumbnail);


        for(const key in sports) {
            tiles.push(
                <MasonryImageTile
                    key={`sports-sport-${key}`}
                    poster={sports[key].thumbnail}
                    overlay={<div 
                        className="centerOverlay" 
                        onTouchTap={() => this.handleOnClick(sports[key])}> 
                        <h2>{sports[key].title}</h2>
                        </div>}
                />,
            );
        }
        return tiles;
    }

    render() {
        return (
        <div className="container-fluid sportsMainPage">
          <br />
          <MasonryContainer>
            {this.getTiles()}
          </MasonryContainer>
        </div>

        );
    }
}

SportsPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
    sportsInfo: state.sportsInfo,
});

export default connect(mapStateToProps)(SportsPage);
