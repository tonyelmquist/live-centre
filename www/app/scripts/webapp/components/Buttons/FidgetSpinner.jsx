import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FidgetSpinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            buttonLinks: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
            ],
            rotation: 0,
            rotationSpeed: .5,
            links: [],
            linkDistanceFromCenter: 140,
            linkSize: 80,
        };

        this.viewportSize = 360;
        this.centralXY = this.viewportSize / 2;
        this.centralStartRadius = 35;

        if (typeof this.state.buttonLinks !== 'undefined') {
            this.state.baseAngle = ((360 / this.state.buttonLinks.length) * Math.PI) / 180;

            // Discover and place links
            for (let i = 0; i < this.state.buttonLinks.length; i++) {
                const button = this.state.buttonLinks[i];
                const angle = this.state.baseAngle * i;
                button.x = Math.cos(angle) * this.state.linkDistanceFromCenter;
                button.y = Math.sin(angle) * this.state.linkDistanceFromCenter;
                button.angle = angle;
                button.size = this.state.smallCircleSize;
                this.state.links.push(button);
            }
        }

        this.previousTouchPosition = {};
        this.nextTouchPosition = {};

        this.onCentralClick = this.onCentralClick.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
    }

    onCentralClick() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    touchStart(e) {
        // e.preventDefault();
        this.previousTouchPosition = {
            x: e.changedTouches.clientX,
            y: e.changedTouches.clientY,
        };
    }

    touchMove(e) {
        // e.preventDefault();
        this.nextTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        const differenceMovement = {
            x: this.previousTouchPosition.x - this.nextTouchPosition.x,
            y: this.previousTouchPosition.y - this.nextTouchPosition.y,
        };

        const currentRotation = this.state.rotation;

        // console.log(differenceMovement);
        // console.log(this.state.rotationSpeed * differenceMovement.y, currentRotation);
        if (!isNaN(differenceMovement.x) && !isNaN(differenceMovement.y)) {
            this.setState({
                rotation: this.state.rotation + (this.state.rotationSpeed * (differenceMovement.y)),
            });
        }

        // console.log(this.state.rotation);

        this.previousTouchPosition = this.nextTouchPosition;
    }

    render() {
        const spinnerLinks = this.state.links.map(link => (

            <circle
                key={link.id}
                className={`fidget-spinner-link ${this.state.isOpen ? 'isOpen' : ''}`}
                cx={link.x + this.centralXY}
                cy={link.y + this.centralXY}
                r={this.state.linkSize / 2}
                fill="red"
            />
        ));

        return (
            <div className={`fidget-spinner-container ${this.state.isOpen ? 'isOpen' : ''} ${this.props.isShowing ? 'isShowing' : ''}`}>
                <svg
                    height={this.viewportSize}
                    viewBox={`0 0 ${this.viewportSize} ${this.viewportSize}`}
                    width={this.viewportSize}
                    xmlns="http://www.w3.org/2000/svg"
                    overflow="visible"
                >

                     <g style={{ transform: `rotate(${this.state.rotation}deg)` }} className={`fidget-spinner-links ${this.state.isOpen ? 'isOpen' : ''}`} onTouchStart={this.touchStart} onTouchMove={this.touchMove}>
                        <rect className={`fidger-spinner-touch-zone ${this.state.isOpen ? 'isOpen' : ''}`} x="0" y="0" width={this.viewportSize} height={this.viewportSize} fill="transparent" />
                        {spinnerLinks}
                     </g>

                     <g className={`fidget-spinner-center ${this.state.isOpen ? 'isOpen' : ''}`} onClick={this.onCentralClick}>
                        <circle cx={this.centralXY} cy={this.centralXY} r={this.centralStartRadius} fill="red" />
                     </g>
                </svg>
          </div>
        );
    }
}

FidgetSpinner.defaultProps = {
    isShowing: true,
};

FidgetSpinner.propTypes = {
    isShowing: PropTypes.bool,
};

export default FidgetSpinner;