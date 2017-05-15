import React from 'react';
import PropTypes from 'prop-types';
import TabLinks from './TabLinks';


const tabs = ["Overview", "Episodes", "More Like This", "Details"];

const ProductCard = ({video}) => (
<div className="product-card">
  <div className="card-content">flex item 1</div>
  {<TabLinks items={tabs} active={0}/>}
</div>
);

ProductCard.propTypes = {
    video : PropTypes.object.isRequired
};

export default ProductCard;
