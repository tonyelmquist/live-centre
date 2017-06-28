import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
    overlayStyle: {
        position: 'absolute',
        zIndex: 2147483647,
        height: '30px',
        width: '200px',
        top: 2,
        left: 0,
    },
    dataStyle: {
        position: 'absolute',
        fontSize: '18px',
        zIndex: 2147483647,
        marginLeft: 5,
        color: 'white',
    },
};

class DataOverlay extends Component {

    render() {
        return (
          <div style={styles.overlayStyle}>
            <div className="trapezoid" />
            <div style={styles.dataStyle}>Score: {this.props.score}</div>
          </div>
        );
    }
}

DataOverlay.propTypes = {
    score: PropTypes.string,
};

const mapStateToProps = state => ({ score: state.dataOverlay });

export default connect(mapStateToProps)(DataOverlay);
