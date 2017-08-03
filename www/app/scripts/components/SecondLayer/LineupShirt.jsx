import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineupShirt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xPosition: 0,
            yPosition: 0,
        };

        const centralPosition = 51;
        const GKPositions = [12.5, 87.5];
        const CBPositions = [25, 75];
        const SSPositions = [80, 20];

        this.positions = {
            GK: {
                L: {
                    x: GKPositions[0],
                    y: centralPosition,
                },
                R: {
                    x: GKPositions[1],
                    y: centralPosition,
                },
            },
            SS: {
                L: {
                    x: SSPositions[0],
                    y: centralPosition,
                },
                R: {
                    x: SSPositions[1],
                    y: centralPosition,
                },
            },
            CB: {
                L: {
                    x: CBPositions[0],
                    y: centralPosition,
                },
                R: {
                    x: CBPositions[1],
                    y: centralPosition,
                },
            },
        };

        if (typeof this.positions[this.props.position] === 'undefined') {
            console.error({ name: 'Unknown Position', message: `Position '${this.props.position}' is unknown` });
        } else {
            this.state = {
                xPosition: this.positions[this.props.position][this.props.side].x,
                yPosition: this.positions[this.props.position][this.props.side].y,
            };
        }
    }

    static hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => (r + r + g + g + b + b));

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }

    getTextColor = () => {
        const textColor = LineupShirt.hexToRgb(this.props.colorLeft);
        return (Math.round(((parseInt(textColor.r) * 299) +
                      (parseInt(textColor.g) * 587) +
                      (parseInt(textColor.b) * 114)) / 1000)) > 125 ? 'black' : 'white';
    }

    render() {
        return (
          <svg
            version="1.1"
            className="football-shirt"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 19 18"
            style={{ left: `${this.state.xPosition}%`, top: `${this.state.yPosition}%` }}
            onClick={this.props.onClick}
          >
            <g>
              <polygon fill={this.props.colorLeft} points="0,0.6 0,5.8 2.8,5.8 2.8,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.1 12.1,0.6 " />
              <polygon fill={this.props.colorRight} points="19.2,0.6 19.2,5.8 16.4,5.8 16.4,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.3 11.9,0.6 " />
              <path fill="#FFFFFF" d="M9.6,3.7L6.3,0.5h6.5L9.6,3.7z M7.7,1.1l1.9,1.8l1.8-1.8H7.7z" />
              <rect fill={this.props.colorDarker} x="0" y="5.1" width="2.8" height="0.8" />
              <rect fill={this.props.colorDarker} x="16.4" y="5.1" width="2.8" height="0.8" />
              <text fill={this.getTextColor()} x="9.5" y="13" fontSize="9" textAnchor="middle">{this.props.number}</text>
            </g>
          </svg>

        );
    }
}

LineupShirt.defaultProps = {
    textColor: 'white',
    onClick() {},
};

LineupShirt.propTypes = {
    colorLeft: PropTypes.string.isRequired,
    colorRight: PropTypes.string.isRequired,
    colorDarker: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default LineupShirt;
