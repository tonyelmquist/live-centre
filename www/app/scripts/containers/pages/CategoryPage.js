import React from 'react';
import PropTypes from 'prop-types';

export default class Category extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="slide">
                <h1>{this.props.match.params.categoryKey}</h1>
                <p>Should load videos from specified category</p>
            </div>
        );
    }
}

Category.propTypes = {
    match :PropTypes.object,
};
