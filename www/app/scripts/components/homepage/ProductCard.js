import React from 'react';
import PropTypes from 'prop-types';
import TabLinks from './TabLinks';
import Tabs from '../common/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {blue500, red500} from 'material-ui/styles/colors';

const tabs = ["Overview", "Episodes", "Trailers", "Details"];
const style = {
  marginTop: 5,
};


const ProductCard = (props) => (
    // <Row className=''>
    <div>
        <Col xs={12} className='product-card'>

            <div className='sixteen-by-nine'></div>
            <Tabs active={props.active}>
                <div className='content'>
                    <div className='tab-header'>
                        <h3>Overview</h3>
                        <IconButton style={style} tooltip="Close" onTouchTap={props.closeCard}>
                          <CloseIcon color={red500}/>
                        </IconButton>
                    </div>
                    <img src='img/eiffel.jpg' width='100%'/>
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
    active : PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired,
    closeCard: PropTypes.func.isRequired

};

export default ProductCard;
