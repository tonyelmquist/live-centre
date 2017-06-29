import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { red500, fullWhite } from 'material-ui/styles/colors';


import Poster from '../common/Poster';
import VideoDescription from '../common/VideoDescription';

const styles = {
    cardStyle: {
        position: 'fixed',
        minWidth: '100%',
        minHeight: '100%',
        zIndex: 2147483647,
        top: 0,
        left: 0,
        backgroundColor: fullWhite,
    },
    mediumIcon: { width: 32, height: 32 },
    medium: { width: 40, height: 40, padding: 8 },
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
      <Row>
        <Col xs={12} md={6}>
          {<Poster
            handlePlay={() => { props.handlePlay(props.video.item.video_url); }} 
            imageUrl={props.video.item.thumbnail}
          />}
        </Col>
        <Col xs={12} md={6}>
          <VideoDescription video={props.video.item} />
        </Col>
      </Row>
    </div>
);

ProductCardMobile.propTypes = {
    closeCard: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    handlePlay: PropTypes.func.isRequired,
};

export default ProductCardMobile;
