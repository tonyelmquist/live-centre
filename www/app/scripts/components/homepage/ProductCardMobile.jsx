import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { red500, fullWhite } from 'material-ui/styles/colors';


import Poster from '../common/Poster';
import VideoDescription from '../common/VideoDescription';
import Recommendations from '../common/Recommendations';
import SeasonsFooter from '../common/SeasonsFooter';

const styles = {
    cardStyle: {
        position: 'fixed',
        bottom: 1,
        overflow: 'auto',
        width: '100%',
        zIndex: 500,
        top: 0,
        left: 0,
        backgroundColor: '#393939',
        color: '#f0f0f0',
    },
    mediumIcon: { width: 32, height: 32, color: '#f0f0f0' },
    medium: { width: 40, height: 40, padding: 8, position:'absolute', top: 0, right: 10, zIndex: 100 },
};


const ProductCardMobile = props => (
    props.video &&
    <div style={styles.cardStyle} className="product-card-mobile">
      <IconButton
        iconStyle={styles.mediumIcon}
        style={styles.medium}
        onTouchTap={props.closeCard}
      >
        <CloseIcon hoverColor={red500} />
      </IconButton>
      {<Poster
        handlePlay={() => { props.handlePlay(props.video.item); }}
        imageUrl={props.video.item.thumbnail}
      />}
      <VideoDescription video={props.video.item} />
      {props.video.item.series === undefined
        ? <Recommendations video={props.video.item} tags={props.tags} allVideos={props.videos} />
        : <SeasonsFooter
            video={props.video.item}
            videos={props.videos}
            series={props.series}
            seasons={props.seasons}
        />
      }
    </div>
);

ProductCardMobile.propTypes = {
    closeCard: PropTypes.func.isRequired,
    video: PropTypes.objectOf(PropTypes.any).isRequired,
    handlePlay: PropTypes.func.isRequired,
};

export default ProductCardMobile;
