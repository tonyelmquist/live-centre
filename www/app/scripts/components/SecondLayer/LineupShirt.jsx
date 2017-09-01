import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineupShirt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xPosition: 0,
            yPosition: 0,
            clicked: false,
        };

        const Rows = {
            LW: 15,
            LMW: 20,
            CL: 33,
            C: 50,
            CR: 66,
            RMW: 80,
            RW: 85,
        };

        const Cols = {
            GK: 12.5,
            CB: 25,
            FB: 35,
            WB: 40,
            DMF: 40,
            CMF: 50,
            OMF: 60,
            S: 70,
            FW: 80,
        };

        this.positions = {
            'Goalkeeper': {
                x: Cols.GK,
                y: Rows.C,
            },
            'Striker': {
                x: Cols.S,
                y: Rows.C,
            },

            // Center Backs
            'Left back': {
                x: Cols.CB,
                y: Rows.CL,
            },
            'Central defender': {
                x: Cols.CB,
                y: Rows.C,
            },
            'Right back': {
                x: Cols.CB,
                y: Rows.CR,
            },

            // Defensive Mid Field
            DMF1: {
                x: Cols.DMF,
                y: Rows.CL,
            },
            DMF2: {
                x: Cols.DMF,
                y: Rows.C,
            },
            DMF3: {
                x: Cols.DMF,
                y: Rows.CR,
            },

            // Central Mid Field
            'Left winger': {
                x: Cols.CMF,
                y: Rows.CL,
            },
            'Central midfielder': {
                x: Cols.CMF,
                y: Rows.C,
            },
            'Right winger': {
                x: Cols.CMF,
                y: Rows.CR,
            },

            // Offensive Mid Field
            OMF1: {
                x: Cols.OMF,
                y: Rows.CL,
            },
            OMF2: {
                x: Cols.OMF,
                y: Rows.C,
            },
            OMF3: {
                x: Cols.OMF,
                y: Rows.CR,
            },
        };

        const sideSwitch = (this.props.side === 'L');

        if (typeof this.positions[this.props.position] === 'undefined') {
            console.error({ name: 'Unknown Position', message: `Position '${this.props.position}' is unknown` });
        } else {
            if (sideSwitch) {
                this.state = {
                    xPosition: this.positions[this.props.position].x,
                    yPosition: this.positions[this.props.position].y,
                };
            } else {
                this.state = {
                    xPosition: 100 - this.positions[this.props.position].x,
                    yPosition: 100 - this.positions[this.props.position].y,
                };
            }
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

    onClick = () => {
        this.setState({ clicked: true });
        this.props.onClick();
    }

    render() {
        const containerStyles = {
            left: `${this.state.xPosition}%`,
            top: `${this.state.yPosition}%`,
        };
        return (
            <div className="lineup-shirt-container" style={containerStyles}>
                { this.props.clickIndicator && !this.state.clicked ? <div className="click-indicator-shirt" /> : <div /> }
                <svg
                    version="1.1"
                    className="football-shirt"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 19 18"
                    onClick={this.onClick}
                >
                    <g>
                    <polygon fill={`#${this.props.base}`} points="0,0.6 0,5.8 2.8,5.8 2.8,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.1 12.1,0.6 " />
                    <polygon fill={`#${this.props.base}`} points="19.2,0.6 19.2,5.8 16.4,5.8 16.4,17.5 9.6,17.5 9.6,5.8 9.6,5.7 9.6,3.3 11.9,0.6 " />
                    <path fill={`#${this.props.sleeve}`} d="M9.6,3.7L6.3,0.5h6.5L9.6,3.7z M7.7,1.1l1.9,1.8l1.8-1.8H7.7z" />
                    <rect fill={`#${this.props.sleeve}`} x="0" y="5.1" width="2.8" height="0.8" />
                    <rect fill={`#${this.props.sleeve}`} x="16.4" y="5.1" width="2.8" height="0.8" />
                    <text fill={`#${this.props.text}`} x="9.5" y="14" fontSize="9" textAnchor="middle">{this.props.number}</text>
                    </g>
                </svg>
          </div>

        );
    }
}

LineupShirt.defaultProps = {
    textColor: 'white',
    onClick() {},
    clickIndicator: false,
};

LineupShirt.propTypes = {
    base: PropTypes.string.isRequired,
    sleeve: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    clickIndicator: PropTypes.bool,
};

export default LineupShirt;


/**
 * 
 * 
+---------------------------------------------------+-------------------------------------------------+
|                                                   |                                                ||
|                                                   |                                                ||
|               LFB          LWB                 LMF|                            LSW                 ||
|                                                   |                                                ||
|                                                   |                                                ||
+---------------+                                   |                                -----------------+
|               |                                   |                                |                |
|               |                                   |                                |                |
|               |                                   |                                |                |
|            CB1|                                   |                                |                |
+-------+       |                         +-------------------+                      |       +--------+
|       |       |                     DMF1|       CM|F1       |OMF1                S1|       |        |
|       |       |                         |         |         |                      |       |        |
|       |       +----+                    |         |         |                 +----+       |        |
|       |       |    |                    |         |         |                 |    |       |        |
|     GK|    CB2|    |                DMF2|       CM|F2       |OMF2             |  S2|   CF  |        |
|       |       |    |                    |         |         |                 |    |       |        |
|       |       +----+                    |         |         |                 +----+       |        |
|       |       |                         |         |         |                      |       |        |
|       |       |                         |         |         |                      |       |        |
+-------+       |                     DMF3|       CM|F3       |OMF3                S3|       +--------+
|            CB3|                         +-------------------+                      |                |
|               |                                   |                                |                |
|               |                                   |                                |                |
|               |                                   |                                |                |
+---------------+                                   |                                -----------------+
|                                                   |                                                 |
|                                                   |                                                 |
|               RFB         RWB                     |                            RSW                  |
|                                                   |                                                 |
|                                                   |                                                 |
+---------------------------------------------------+-------------------------------------------------+
 * 
 */
