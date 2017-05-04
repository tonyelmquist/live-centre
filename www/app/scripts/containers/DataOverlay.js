import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = {
  overlayStyle: {
  width: '100%',
  position: 'absolute',
  fontSize: '18px',
  zIndex: 2147483647,
  height: '30px',
  width: '200px',
  bottom: 32,
  left: 0,
  paddingLeft: '10px',
  color: 'white'
  },
};

class DataOverlay extends Component {

render () {
      return (<div>
          <div className='trapezoid'></div>
          <div style={styles.overlayStyle}>Score: {this.props.score}</div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      score: state.dataOverlay
    };
};

export default connect(mapStateToProps)(DataOverlay);
