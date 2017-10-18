import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class EditableInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
    }

    onEdit = () => {
        this.setState({
            isEditing: true,
        });
    }

    onSubmit = () => {
        this.setState({
            isEditing: false,
        });
        this.props.onChange(this.inputField.value);
    }

    render() {
        return (
            <div className="editable-input">
                {this.state.isEditing ? <input type="text" defaultValue={this.props.value} ref={ref => (this.inputField = ref)} /> : <span>{this.props.value}</span>}
                {this.state.isEditing ? <FontAwesome name="check" onClick={this.onSubmit} /> : <FontAwesome name="pencil" onClick={this.onEdit} /> }
            </div>
        );
    }
}

EditableInput.defaultProps = {
    value: '',
};

EditableInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default EditableInput;