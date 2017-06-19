import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {blue500, red500} from 'material-ui/styles/colors';

import TabLinks from './TabLinks';
import Tabs from '../common/Tabs';
import Player from '../common/Player';
import Poster from '../common/Poster';

const tabs = ["Overview", "Episodes", "Trailers", "Details"];
const styles = {
  mediumIcon: { width: 32, height: 32},
  medium: {width: 40, height: 40, padding: 8}
};


const ProductCard = (props) => (
    props.videoUrl &&
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
                <div><h3>{tabs[props.active]}</h3></div>
            </div>
            <div className='keep-ratio'></div>
            <Tabs active={props.active}>

                    {/* <Player videoUrl={props.videoUrl}/> */}
                    {<Poster handlePlay={()=>{console.log('Playing');}} imageUrl='img/eiffel.jpg'/>}

                <div className='content'></div>
                <div className='content'></div>
                <div className='content'></div>
            </Tabs>
        </Col>
        <Col xs={12}>
            <TabLinks items={tabs} active={props.active} handleChange={props.changeTab}/>
        </Col>
    </div>

);

ProductCard.propTypes = {
    active : PropTypes.number,
    changeTab: PropTypes.func,
    closeCard: PropTypes.func,
    videoUrl: PropTypes.string,
    selected: PropTypes.bool
};

export default ProductCard;
