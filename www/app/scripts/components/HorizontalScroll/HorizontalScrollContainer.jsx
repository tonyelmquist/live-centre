import React from 'react';
import PropTypes from 'prop-types';

class HorizontalScrollContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollAnimation: this.props.animate ? 300 : 0,
        };
    }

    componentDidMount() {
        if (!this.props.animateOnUpdate) {
            this.scrollToZero();
        }
    }

    componentDidUpdate() {
        if (this.state.scrollAnimation !== 0) {
            this.scrollToZero();
        }
    }

    scrollToZero() {
        console.log('animate scroll');
        setTimeout(() => this.setState({ scrollAnimation: 0 }), 300);
    }

    render() {
        return (
          <div className="horizontalScroll-outer" style={{ transition: '0.5s all', transform: `translate(${this.state.scrollAnimation}px)`, height: `${this.props.height}px` }}>
            <div className="horizontalScroll">
              <div className="horizontalScrollInner" >
                {this.props.children}
              </div>
            </div>
          </div>
        );
    }
}


HorizontalScrollContainer.propTypes = {
    animate: PropTypes.bool,
    animateOnUpdate: PropTypes.bool,
    height: PropTypes.string,
    children: PropTypes.object.isRequired,
};

HorizontalScrollContainer.defaultProps = {
    animate: true,
    animateOnUpdate: false,
    height: 'auto',
};

export default HorizontalScrollContainer;

