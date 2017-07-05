import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineupShirt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xPosition: 0,
            yPosition: 0,
        }

        if (this.props.position == "GK") {
            this.state = {
                xPosition: '12.5%',
                yPosition: '51%',
            };
        }
        if (this.props.position == "GK2") {
            this.state = {
                xPosition: '87.5%',
                yPosition: '51%',
            };
        }
    }
    render() {
        return (
            <svg version="1.1" className="football-shirt" xmlns="http://www.w3.org/2000/svg"x="0px" y="0px"
                viewBox="0 0 19 18" style={{left: this.state.xPosition, top: this.state.yPosition}}>
                <g>
                    <polygon fill={this.props.colorLeft} points="0,0.6 0,5.8 2.8,5.8 2.8,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.1 12.1,0.6 	"/>
                    <polygon fill={this.props.colorRight} points="19.2,0.6 19.2,5.8 16.4,5.8 16.4,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.3 11.9,0.6 	"/>
                    <path fill="#FFFFFF" d="M9.6,3.7L6.3,0.5h6.5L9.6,3.7z M7.7,1.1l1.9,1.8l1.8-1.8H7.7z"/>
                    <rect fill={this.props.colorDarker} x="0"    y="5.1"  width="2.8" height="0.8"/>
                    <rect fill={this.props.colorDarker} x="16.4" y="5.1"  width="2.8" height="0.8"/>
                    <text fill={this.props.textColor} x="9.5" y="13" fontSize="9" textAnchor="middle">{this.props.number}</text>
                </g>
            </svg>

        );
    }
}

LineupShirt.defaultProps = {
    textColor: 'white',
}

LineupShirt.propTypes = {
    colorLeft: PropTypes.string.isRequired,
    colorRight: PropTypes.string.isRequired,
    colorDarker: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    number: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};

export default LineupShirt;