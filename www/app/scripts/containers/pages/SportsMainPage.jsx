import React from 'react';
import i18next from 'i18next';
import CirclesRow from '../../components/horizontal-scroll/CirclesRow';
import CircleRowItem from '../../components/horizontal-scroll/CircleRowItem';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class SportsMainPage extends React.Component {

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
                  <h4>{sports[key].title}</h4>
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
          <MasonryContainer>
            {this.getTiles()}
          </MasonryContainer>
        </div>

      );
    }
}

SportsMainPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
    sportsInfo: state.sportsInfo,
});

export default connect(mapStateToProps)(SportsMainPage);
