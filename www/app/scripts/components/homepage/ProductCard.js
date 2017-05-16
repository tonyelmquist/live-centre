import React from 'react';
import PropTypes from 'prop-types';
import TabLinks from './TabLinks';
import Tabs from '../common/Tabs';
import { Row, Col } from 'react-flexbox-grid';

const tabs = ["Overview", "Episodes", "Trailers", "Details"];

const ProductCard = (props) => (
    <Row className=''>
        <Col xs={12} className='product-card'>
            <div className='sixteen-by-nine'></div>
            <Tabs active={props.active}>
                <div className='content'>
                    <h1>Overview</h1>
                    <img src='img/eiffel.jpg' width='100%'/>
                </div>
                <div className='content'><h1>Episodes</h1></div>
                <div className='content'><h1>More Like This</h1></div>
                <div className='content'><h1>Details</h1></div>
            </Tabs>
        </Col>
        <Col xs={12}>
            <TabLinks items={tabs} active={props.active} handleChange={props.changeTab}/>
        </Col>
    </Row>
);

ProductCard.propTypes = {
    active : PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired
};

export default ProductCard;
