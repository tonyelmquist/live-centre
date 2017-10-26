import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

class CustomIcon extends Component {
    static defaultProps = {
        selected: false
    };
    static propTypes = {
        colors: PropTypes.object.isRequired,
        selected: PropTypes.bool,
        name: PropTypes.string.isRequired
    };
    render() {
        const { ICON_DEFAULT, ICON_SELECTED } = this.props.colors;
        return (
            <Icon
                name={this.props.name}
                size={28}
                style={{ margin: 5 }}
                color={this.props.selected ? ICON_SELECTED : ICON_DEFAULT}
            />
        );
    }
}

const mapStateToProps = state => ({
    colors: state.colors
});

export default connect(mapStateToProps)(CustomIcon);
