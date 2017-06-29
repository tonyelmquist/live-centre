import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BurstButton from '../components/BurstButton';

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
    burstButtonContainer: {
      position: 'absolute',
      right: '0',
      bottom: '-240px',
      zIndex: 100000,
      overflow: 'auto',
  }

};

class DataOverlay extends Component {



    render() {

            this.burstButtonLinks = [
        {
            action: function() {
                console.log('Pressed ID 1');
            },
            icon: 'a'
        },
        {
            action: function() {
                console.log('Pressed ID 2');
            },
            icon: 'b'
        },
        {
            action: function() {
                console.log('Pressed ID 3');
            },
            icon: 'c'
        },
        {
            action: function() {
                console.log('Pressed ID 4');
            },
            icon: 'c'
        },
        {
            action: function() {
                console.log('Pressed ID 5');
            },
            icon: 'c'
        },
    ]

        return (
          <div style={styles.overlayStyle}>
            <div className="trapezoid" />
            <div style={styles.dataStyle}>Score: {this.props.score}</div>
            <BurstButton buttonLinks={this.burstButtonLinks} style={styles.burstButtonContainer}/>

          </div>
        );
    }
}

DataOverlay.propTypes = {
    score: PropTypes.string,
};

const mapStateToProps = state => ({ score: state.dataOverlay });

export default connect(mapStateToProps)(DataOverlay);
