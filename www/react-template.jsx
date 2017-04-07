import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReduxConstants } from '../constants';
import { StoreUtils } from '../utils';

import * as actionCreators from '../actions';

class Template extends React.Component {
    
    static propTypes = {
        actions: React.PropTypes.object,
        title: React.PropTypes.string.isRequired,
        requiredArray: React.PropTypes.array.isRequired,
        requiredBool: React.PropTypes.bool.isRequired,
        requiredFunc: React.PropTypes.func.isRequired,
        requiredNumber: React.PropTypes.number.isRequired,
        requiredObject: React.PropTypes.object.isRequired,
        array: React.PropTypes.array,
        arrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        object: React.PropTypes.object,
        objectOf: React.PropTypes.objectOf(React.PropTypes.number),
        message: React.PropTypes.instanceOf(Message),
        enum: React.PropTypes.oneOf(['M','F'])
    };

    static defaultProps = {
        title: 'Undefined Product'
    };

    constructor(props, context) {
        super(props, context);
        this.state = {count: props.initialCount};
        this.tick = this.tick.bind(this);   // Bind functions once in the constructor
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false; // Nothing to render and not using any props
    }

    componentWillUpdate(nextProps, nextState) {
        // You cannot use this.setState() in this method. If you need to update state in response to a prop change, use componentWillReceiveProps instead.
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    render()
    {
        return (
            <div className="page">
                <div className="page-content">
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedInAndVerified   : StoreUtils.isLoggedIn(state) && StoreUtils.isVerified(state),
    isLoggedIn              : StoreUtils.isLoggedIn(state),
    isVerified              : StoreUtils.isVerified(state)
});

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
