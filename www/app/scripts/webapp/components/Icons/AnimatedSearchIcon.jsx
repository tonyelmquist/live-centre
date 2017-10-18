import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const AnimatedSearchIcon = ({ searchState }) => {
    const styles = (isOpen) => {
        if (isOpen) {
            return {
                linePos1: spring(6),
                linePos2: spring(14),
                o: spring(1),
                cricleOrigin: spring(10),
                circleRadius: spring(8.5),
                fillOpacity: spring(1),
                stroke: spring(1),
            };
        }
        return {
            linePos1: spring(14),
            linePos2: spring(20),
            o: spring(0),
            cricleOrigin: spring(9),
            circleRadius: spring(7),
            fillOpacity: spring(0),
            stroke: spring(0),
        };
    };
    const fadeToBlack = (fill) => {
        const rgb = {
            r: Math.round(fill * 255),
            g: Math.round(fill * 255),
            b: Math.round(fill * 255),
        };
        return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    };

    const svgStyle = {
        margin: '2px',
    };
    const color = 'black';
    return (
      <Motion style={styles(searchState.isOpen)}>
        {style =>
        (<svg
          className="animatedSearchIcon"
          style={svgStyle}
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="circle"
            cy={style.cricleOrigin}
            cx={style.cricleOrigin}
            r={style.circleRadius}
            fillOpacity={style.fillOpacity}
            fill={color}
            stroke={color}
            strokeWidth="2"
          />
          <line
            className="fromLeft"
            x1={style.linePos2}
            y1={style.linePos2}
            x2={style.linePos1}
            y2={style.linePos1}
            strokeWidth="2"
            strokeLinecap="round"
            stroke={fadeToBlack(style.stroke)}
          />
          <line
            className="fromRight"
            style={{ opacity: style.o }}
            x1="6"
            y1="14"
            x2="14"
            y2="6"
            strokeWidth="2"
            strokeLinecap="round"
            stroke={fadeToBlack(style.stroke)}
          />
        </svg>)}
      </Motion>
    );
};

AnimatedSearchIcon.defaultProps = {
    searchState: {},
};

AnimatedSearchIcon.propTypes = {
    searchState: PropTypes.object,
};

export default AnimatedSearchIcon;
