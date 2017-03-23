import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ons from 'onsenui';

import * as actionCreators from '../../actions';
import JavascriptBridge from '../../utils/javascriptbridge';

// The JavascriptBridgeComponent initialisation is a separate component to ensure that it is initalised at the
// correct time and ready for any other components that need it. It needs to be placed as the
// first item in the App view

class JavascriptBridgeComponent extends React.Component {
    static propTypes = {
        actions: React.PropTypes.object
    };
    componentDidMount() {
        window.jsBridge = new JavascriptBridge(this.props.actions, ons.platform.isAndroid(), ons.platform.isIOS());
    }

    shouldComponentUpdate() {
        return false; // Nothing to render
    }

    render()
    {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(JavascriptBridgeComponent);
