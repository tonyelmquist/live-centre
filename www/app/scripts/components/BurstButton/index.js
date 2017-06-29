import React from 'react';
import PropTypes from 'prop-types';

class BurstButton extends React.Component {
    constructor(props) {
        super(props);

        this.size = 60;

        this.state = {
            isOpen: false,
            largeCircleSize: 60,
            size: 60,
            padding: 20,
            activeButton: '',
            color: '#3498db',
        };

        this.circlePadding = 40;
        this.smallCircleSize = 36;

        this.viewportSize = (this.state.size + this.circlePadding + this.smallCircleSize);
        this.largeXY = (this.viewportSize) / 2;

        this.smallTopLeft = {
            x: this.largeXY - this.circlePadding,
            y: this.largeXY - this.circlePadding,
        };

        this.smallTopRight = {
            x: this.largeXY + this.circlePadding,
            y: this.largeXY - this.circlePadding,
        };

        this.smallBottomLeft = {
            x: this.largeXY - this.circlePadding,
            y: this.largeXY + this.circlePadding,
        };

        this.smallBottomRight = {
            x: this.largeXY + this.circlePadding,
            y: this.largeXY + this.circlePadding,
        };


        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);

        this.startTouchPosition = null;
        this.endTouchPosition = null;
        this.startTouchEvent = null;
        this.endTouchEvent = null;
    }

    direction() {
        let x = 0;
        let y = 0;
        const startPos = this.startTouchPosition;
        const endPos = this.endTouchPosition;

        if (endPos.x - startPos.x < 0) {
            x = -1;
        } else if (endPos.x - startPos.x === 0) {
            x = 0;
        } else {
            x = 1;
        }

        if (endPos.y - startPos.y > 0) {
            y = -1;
        } else if (endPos.y - startPos.y === 0) {
            y = 0;
        } else {
            y = 1;
        }

        return {
            x,
            y,
        };
    }

    toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    touchStart(e) {
        this.startTouchEvent = e.changedTouches;
        this.endTouchEvent = e.changedTouches;
        this.startTouchPosition = {
            x: this.startTouchEvent[0].clientX,
            y: this.startTouchEvent[0].clientY,
        };
        this.endTouchPosition = {
            x: this.endTouchEvent[0].clientX,
            y: this.endTouchEvent[0].clientY,
        };
        this.setState({ isOpen: true });
    }

    touchMove(e) {
        this.endTouchEvent = e.changedTouches;
        this.endTouchPosition = {
            x: this.endTouchEvent[0].clientX,
            y: this.endTouchEvent[0].clientY,
        };

        let button = '';

        if (this.direction().y > 0) {
            button += 'top ';
        } else {
            button += 'bottom ';
        }

        if (this.direction().x > 0) {
            button += 'right';
        } else {
            button += 'left';
        }

        if (this.state.activeButton !== button && button !== '') {
            this.setState({ activeButton: button });
        }
    }

    touchEnd() {
        this.setState({ isOpen: false, activeButton: '' });
        if (this.state.activeButton === 'top left') {
            this.props.topLeftAction();
        }
        if (this.state.activeButton === 'top right') {
            this.props.topRightAction();
        }
        if (this.state.activeButton === 'bottom left') {
            this.props.bottomLeftAction();
        }
        if (this.state.activeButton === 'bottom right') {
            this.props.bottomRightAction();
        }
    }

    click() {
        this.toggleMenu();
    }

    render() {
        return (
            <div className="burst-button-container" style={this.props.style}>
                <svg className="burst-button" height={this.viewportSize} viewBox={`0 0 ${this.viewportSize} ${this.viewportSize}`} width={this.viewportSize} xmlns="http://www.w3.org/2000/svg">
                    {/* Large Central Circle */}
                    <g className={`burst-large-circle ${this.state.isOpen ? 'open' : ''}`} onClick={this.toggleMenu} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                        <circle cx={this.largeXY} cy={this.largeXY} r={this.state.size / 2} fill="#3498db" />
                        <line x1={this.largeXY - 10} y1={this.largeXY} x2={this.largeXY + 10} y2={this.largeXY} strokeWidth="2" stroke="white" />
                        <line x1={this.largeXY} y1={this.largeXY - 10} x2={this.largeXY} y2={this.largeXY + 10} strokeWidth="2" stroke="white" />
                    </g>

                    {/* Top Left Circle */}
                    <g className={`burst-small-circle ${this.state.isOpen ? 'open' : ''} ${this.state.activeButton === 'top left' ? 'active' : ''}`}>
                        <circle cx={this.smallTopLeft.x} cy={this.smallTopLeft.y} r={this.smallCircleSize / 2} fill={this.state.color} />
                        <text fill="white" x={this.smallTopLeft.x} y={this.smallTopLeft.y}>&#xf040;</text>
                    </g>

                    {/* Top Right Circle */}
                    <g className={`burst-small-circle ${this.state.isOpen ? 'open' : ''} ${this.state.activeButton === 'top right' ? 'active' : ''}`}>
                        <circle cx={this.smallTopRight.x} cy={this.smallTopRight.y} r={this.smallCircleSize / 2} fill={this.state.color} />
                        <text fill="white" x={this.smallTopRight.x} y={this.smallTopRight.y}>/f040;</text>
                    </g>

                    {/* Bottom Left Circle */}
                    <g className={`burst-small-circle ${this.state.isOpen ? 'open' : ''} ${this.state.activeButton === 'bottom left' ? 'active' : ''}`}>
                        <circle cx={this.smallBottomLeft.x} cy={this.smallBottomLeft.y} r={this.smallCircleSize / 2} fill={this.state.color} />
                        <text fill="white" x={this.smallBottomLeft.x} y={this.smallBottomLeft.y}>&#xf0c0;</text>
                    </g>

                    {/* Bottom Right Circle */}
                    <g className={`burst-small-circle ${this.state.isOpen ? 'open' : ''} ${this.state.activeButton === 'bottom right' ? 'active' : ''}`}>
                        <circle cx={this.smallBottomRight.x} cy={this.smallBottomRight.y} r={this.smallCircleSize / 2} fill={this.state.color} />
                        <text fill="white" x={this.smallBottomRight.x} y={this.smallBottomRight.y}>&#xf040;</text>
                    </g>
                </svg>
            </div>
        );
    }

}

BurstButton.defaultProps = {
    style: {},
};

BurstButton.propTypes = {
    style: PropTypes.shape({}),
    topLeftAction: PropTypes.func.isRequired,
    topRightAction: PropTypes.func.isRequired,
    bottomLeftAction: PropTypes.func.isRequired,
    bottomRightAction: PropTypes.func.isRequired,
};

export default BurstButton;
