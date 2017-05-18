import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';
import {Row} from 'react-flexbox-grid';

class CategoryRow extends Component {

    render() {
        if (this.props.category) {
            var videos = this
                .props
                .videos
                .map(function (video, i) {
                    if (i < 5) {
                        return (<Item video={video}/>);
                    }
                });

        } else {
            var videos = '';
        }

        return (
            <Row>
                <h1 className='rowTitle'>{this.props.category}</h1>
                {videos}
            </Row>
        );
    }
};

export default CategoryRow;