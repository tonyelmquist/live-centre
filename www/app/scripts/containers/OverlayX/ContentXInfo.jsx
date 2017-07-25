import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentXInfo extends Component {
    render() {
        return (
            <div className={`content-x-info`}>
                info
            </div>
        );
    }
}

ContentXInfo.propTypes = {
    video: PropTypes.object,
};

export default ContentXInfo;