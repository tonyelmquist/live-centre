import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';
import RootNavigation from './RootNavigation';

class Navigator extends Component {
    render() {
        return (
            <RootNavigation
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

Navigator.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(Navigator);
