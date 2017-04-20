import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};



const tilesData = [
  {
    img: './img/hqdefault.jpg',
    title: 'Video 1',
    key: '1',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 2',
    key: '2',
    author: 'Mister Fred',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 3',
    key: '3',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 4',
    key: '4',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 5',
    key: '5',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 6',
    key: '6',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 7',
    key: '7',
    author: 'Mister Tony',
  },
  {
    img: './img/hqdefault.jpg',
    title: 'Video 8',
    key: '8',
    author: 'Mister Tony',
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */



const thumbnailList = () => (

  <div style={styles.root}>
   
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >

      {tilesData.map((tile) => (
        <GridTile
          key={tile.key}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}

    </GridList>
    
  </div>
);

export default thumbnailList;