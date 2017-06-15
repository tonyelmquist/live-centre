import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {blue500, red500} from 'material-ui/styles/colors';

import TabLinks from './TabLinks';
import Tabs from '../common/Tabs';
import Player from '../../containers/Player';


const tabs = ["Overview", "Episodes", "Trailers", "Details"];
const styles = {
  mediumIcon: {
      width: 28,
      height: 28
  },
  medium: {
      width: 40,
      height: 40,
      padding: 8
  }
};


const ProductCard = (props) => (

    <div >
        <Col xs={12} className='product-card'>
            <div className='card-header'>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onTouchTap={props.closeCard}
                    >
                    <CloseIcon hoverColor={red500}/>
                </IconButton>
            </div>
            <div className='keep-ratio'></div>
            <Tabs active={props.active}>
                <div className='content'>
                    <div className='tab-header'>
                        <h3>Overview</h3>
                        {props.videoUrl && <Player videoUrl={props.videoUrl}/>}
                        {console.log(props.videoUrl)}
                    </div>

                </div>
                <div className='content'><h3>Episodes</h3></div>
                <div className='content'><h3>More Like This</h3></div>
                <div className='content'><h3>Details</h3></div>
            </Tabs>
        </Col>
        <Col xs={12}>
            <TabLinks items={tabs} active={props.active} handleChange={props.changeTab}/>
        </Col>
    </div>
    //</Row>
);

ProductCard.propTypes = {
    active : PropTypes.number,
    changeTab: PropTypes.func,
    closeCard: PropTypes.func,
    videoUrl: PropTypes.string,
    selected: PropTypes.bool
};

export default ProductCard;
