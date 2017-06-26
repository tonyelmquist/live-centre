import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/avatar';

class CirclesRow extends Component {
    _renderRows = () =>
        this.props.items.map((item)=>{
            return (
                <div className="inline circleAvatar" key={`circlerow-item-${item.key}`}>
                    <Avatar size={80} src={item.img} className="avatar"/>
                    <p className="label">{item.key}</p>
                </div>
            );


        });

    render() {
        return (
            <div className="horizontalScroll">
                <div className="horizontalScrollInner">
                    {this.props.items
                    ? this._renderRows()
                    : (<div></div>)}
                </div>
            </div>
        );
    };
};

CirclesRow.propTypes = {
    items : PropTypes.array.isRequired,
};

export default CirclesRow;
