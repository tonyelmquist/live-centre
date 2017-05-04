import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField, RaisedButton} from 'material-ui';
import { connect } from 'react-redux';

const styles = {
  messagesStyle: {
  width: '100%',
  position: 'absolute',
  fontSize: '18px',
  zIndex: 2147483647,
  height: '200px',
  width: '50%',
  top: 0,
  right: 0,
  color: 'black',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
},
chatInputStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0
},
chatSendButton: {
    marginLeft: 10,
    position: 'absolute',
    bottom: 0,
    right: 0
}
};

class Chat extends Component {

    constructor(props) {
        super(props);
        // make sure the "this" variable keeps its scope
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }


render () {
      return (<div>         
          <div style={styles.messagesStyle}><p>{this.props.receivedMessage}</p><TextField
      hintText="Hint Text" fullWidth={true} style={styles.chatInputStyle} onChange={this.handleChange}
            /> <RaisedButton label="Send" style={styles.chatSendButton} onTouchTap={() => this.onClick()}/></div>          
          </div>
      );
    }

    onClick() {
        this.props.dispatch(addMessage(message));
        console.log(this.state.clientMessage);
    }

    handleChange(event, newValue): void {
        event.persist();         
        this.setState((state) => state.clientMessage = newValue);
    }
}

Chat.propTypes = {
    receivedMessage: PropTypes.string,
    sentMessage: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
      receivedMessage: state.chatMessage.serverMessage,
      sentMessage: state.chatMessage.clientMessage
    };
};

export default connect(mapStateToProps)(Chat);
