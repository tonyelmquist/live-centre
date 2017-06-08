import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/avatar';

class PortraitRows extends Component {
    _renderRows = () =>
        this.props.people.map((person)=>{
            return (
                <div className="inline" key={`avatar-${person.username+person.uid}`}>
                    <Avatar src={person.img} className="avatar"/>
                    <p className="username">{person.username}</p>
                </div>
                /*<div className="items">
                    <img src={person.img} className="avatar"/>
                    {person.username}
                </div>*/
            );


        });

    render() {
        return (
            <div className="horizontalScroll">
                <div className="horizontalScrollInner">
                    {this.props.people
                    ? this._renderRows()
                    : (<div></div>)}
                </div>
            </div>
        );
    };
};

PortraitRows.propTypes = {
    people : PropTypes.array
};

export default PortraitRows;
