import React from 'react';
import PropTypes from 'prop-types';

class BurstButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            largeCircleSize: 60,
            size: 60,
            padding: 20,
            activeButton: -1,
            color: '#3498db',
            baseAngle: 0,
            links: [],
        };


        if (typeof this.props.buttonLinks !== 'undefined') {
            this.state.baseAngle = ((360 / this.props.buttonLinks.length) * Math.PI) / 180;

            // Discover and place links
            for (let i = 0; i < this.props.buttonLinks.length; i++) {
                const button = this.props.buttonLinks[i];
                const angle = this.state.baseAngle * i;
                button.x = Math.cos(angle) * this.props.smallCircleDistance;
                button.y = Math.sin(angle) * this.props.smallCircleDistance;
                button.angle = angle;
                button.size = this.props.smallCircleSize;
                this.state.links.push(button);
            }
        }

        this.circlePadding = 40;
        this.smallCircleSize = 36;

        this.viewportSize = (this.state.size +
        this.props.smallCircleSize + this.props.smallCircleDistance);

        this.centerXY = (this.viewportSize) / 2;

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);

        this.startTouchPosition = null;
        this.endTouchPosition = null;
        this.startTouchEvent = null;
        this.endTouchEvent = null;
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

        const normalTouchPoint = {
            x: this.endTouchPosition.x - this.startTouchPosition.x,
            y: this.endTouchPosition.y - this.startTouchPosition.y,
        };

        let finalAngle = 0;
        if (normalTouchPoint.x < 0 && normalTouchPoint.y < 0) {
            finalAngle = Math.atan(Math.abs(normalTouchPoint.y) / Math.abs(normalTouchPoint.x));
            finalAngle += Math.PI;
        } else if (normalTouchPoint.x < 0) {
            finalAngle = Math.atan(Math.abs(normalTouchPoint.x) / Math.abs(normalTouchPoint.y));
            finalAngle += (1 / 2) * Math.PI;
        } else if (normalTouchPoint.y < 0) {
            finalAngle = Math.atan(Math.abs(normalTouchPoint.x) / Math.abs(normalTouchPoint.y));
            finalAngle += (3 / 2) * Math.PI;
        } else {
            finalAngle = Math.atan(Math.abs(normalTouchPoint.y) / Math.abs(normalTouchPoint.x));
        }

        const finalLength = Math.sqrt((normalTouchPoint.x ** 2) + (normalTouchPoint.y ** 2));

        let linkToSet = 0;
        if (finalLength > this.state.size / 2) {
            for (let i = 0; i < this.state.links.length; i++) {
                if (this.state.links[i].angle - (this.state.baseAngle / 2) <
                finalAngle && this.state.links[i].angle + (this.state.baseAngle / 2) > finalAngle) {
                    linkToSet = i;
                }
            }
        } else {
            linkToSet = -1;
        }

        if (this.state.activeButton !== linkToSet) {
            this.setState({ activeButton: linkToSet });
        }
    }

    touchEnd() {
        this.setState({ isOpen: false, activeButton: -1 });
        if (typeof this.state.links[this.state.activeButton] !== 'undefined') {
            this.state.links[this.state.activeButton].action();
        }
    }

    click() {
        this.toggleMenu();
    }

    render() {
        const links = this.state.links.map((link, i) => (
          <g key={`burstbutton-link-${link.id}`} className={`burst-small-circle ${this.state.isOpen ? 'open' : ''} ${this.state.activeButton === i ? 'active' : ''}`} onClick={link.action}>
            <circle cx={link.x + this.centerXY} cy={link.y + this.centerXY} r={link.size / 2} fill={this.props.color} />
            <svg fill="#FFFFFF" x={(link.x + this.centerXY) - 12} y={(link.y + this.centerXY) - 12} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              {link.icon}
            </svg>
          </g>
        ));

        return (
          <div className="burst-button-container" style={this.props.style}>
            <svg className={`burst-button ${this.props.isShowing ? '' : 'hide'}`} height={this.viewportSize} viewBox={`0 0 ${this.viewportSize} ${this.viewportSize}`} width={this.viewportSize} xmlns="http://www.w3.org/2000/svg">
              {/* Large Central Circle */}
              <g className={`burst-large-circle ${this.state.isOpen ? 'open' : ''}`} onClick={this.toggleMenu} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                <circle cx={this.centerXY} cy={this.centerXY} r={this.state.size / 2} fill={this.props.color} />
                <line x1={this.centerXY - 10} y1={this.centerXY} x2={this.centerXY + 10} y2={this.centerXY} strokeWidth="2" stroke="white" />
                <line x1={this.centerXY} y1={this.centerXY - 10} x2={this.centerXY} y2={this.centerXY + 10} strokeWidth="2" stroke="white" />
              </g>

              {links}
            </svg>
          </div>
        );
    }

}

BurstButton.defaultProps = {
    style: {},
    smallCircleSize: 40,
    smallCircleDistance: 52,
    buttonLinks: [],
    color: 'rgb(8, 3, 28)',
    isShowing: true,
};

BurstButton.propTypes = {
    style: PropTypes.shape({}),
    smallCircleSize: PropTypes.number,
    smallCircleDistance: PropTypes.number,
    buttonLinks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        action: PropTypes.func,
        icon: PropTypes.any,
    })),
    color: PropTypes.string,
    isShowing: PropTypes.bool,
};

export default BurstButton;
