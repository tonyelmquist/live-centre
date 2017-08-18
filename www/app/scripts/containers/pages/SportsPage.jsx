import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';
import Path from 'path';
import soccer from '../../../img/mockup/sport/soccer.png';
import i18next from 'i18next';

class SportsPage extends React.Component {

    changeRoute = path => this.props.history.push(path);

    filterTile = () => {
        console.log('filter');
    }

    handleOnClick = (item) => {
        console.log('handleclick:', item.title);
        this.changeRoute(`/Sport/${item.title}`);
    }

    getTiles = () => {
        const tiles = [];
        const sports = this.props.sportsInfo.sports;


        for (const key in sports) {
            for (let i = 0; i < 6; i++) { // Cheat to simulate many sports..
                tiles.push(
          <MasonryImageTile
            key={`sports-sport-${key + i}`}
            poster={sports[key].thumbnail}
            overlay={
                <div
                  className="centerOverlay"
                  onTouchTap={() => this.handleOnClick(sports[key])}
                >
                  <h2>{i18next.t(sports[key].title)}</h2>
                </div>
              }
          />,
        );
            }
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
