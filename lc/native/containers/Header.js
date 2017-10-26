import React, { Component } from 'react';
import { TextInput } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
    // static propTypes = {
    //     colors: PropTypes.object.isRequired
    // };

    render() {
        return (
            <TextInput
                // console.log(colors);
                style={{ height: 150, width: 300 }}
                onChangeText={text => this.handleChange(text)}
            />
        );
    }
}

const mapStateToProps = state => ({
    colors: state.colors
});

export default connect(mapStateToProps)(Header);
