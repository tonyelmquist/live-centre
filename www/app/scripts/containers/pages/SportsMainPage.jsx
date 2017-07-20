import React from 'react';
import i18next from 'i18next';
import CirclesRow from '../../components/common/CirclesRow';
import MasonryContainer from '../../components/common/MasonryContainer';
import MasonryImageTile from '../../components/common/MasonryImageTile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



class SportsMainPage extends React.Component {

  changeRoute = path => this.props.history.push(path);

  filterTile = () => {
    console.log("filter");
  }

  handleOnClick = (item) => {
    console.log("handleclick:",item.title);
    this.changeRoute(`/Sport/${item.title}`);
  }

  getTiles = () => {
    const tiles = [];
    const sports = this.props.sportsInfo.sports;

    console.log(sports);
    console.log(this.props);

    for(const key in sports){
      tiles.push(
        <MasonryImageTile
          key={`sports-sport-${key}`}
          poster={sports[key].thumbnail}
          overlay={
              <p>{sports[key].title}</p>
            }
          handleClick={() => this.handleOnClick(sports[key])}
        />
      );
    }
    return tiles;
  }

  render (){


    return(
        <div className="channel-page">
        <div className="container-fluid">        
          <h2>{i18next.t('route_sports')}</h2>
        </div>

        <div className="container-fluid">

          <MasonryContainer>
            {this.getTiles()}
          </MasonryContainer> 
          </div>
      </div>

    );
  };
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
