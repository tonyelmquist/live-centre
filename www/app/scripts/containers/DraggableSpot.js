import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';

const styles = {
  thumbprintButton: {
    position: 'absolute',
    top: 5, 
    right: 5
  }
};

class DraggableSpot extends Component {

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{
        x: 0,
        y: 0
      }}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div style={styles.thumbprintButton}>
          <FloatingActionButton className="handle">
            <Fingerprint/>
          </FloatingActionButton>
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = (state) => {
  return {state_all: state};
};

export default connect(mapStateToProps)(DraggableSpot);