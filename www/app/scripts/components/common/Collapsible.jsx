import React from 'react';
import { Motion, spring } from 'react-motion';
import AnimatedExpandIcon from '../Icons/AnimatedExpandIcon';

const Collapsible = ({label, collapseInfo, toggleCollapseInfo, isCollapsed, text}) => {
    let collapseHeight = 57
    if (typeof this.collapseInnerElement !== 'undefined' && this.collapseInnerElement !== null) {
        collapseHeight = this.collapseInnerElement.scrollHeight;
    }
    const textLength = text.length;
    const springFloat = {stiffness: 170, damping:20};

    return (
        <div>

            <div className="accordion" role="button" onTouchTap={() => toggleCollapseInfo()}> 
                <h4 className="accordion-label">{label}</h4>
                {<AnimatedExpandIcon isCollapsed={isCollapsed} /> }
            </div>

            <Motion style={isCollapsed ? {height:spring(57, springFloat)} : {height:spring(collapseHeight, springFloat)}}>
                {style =>
                    <div 
                    className="collapsible"
                    ref={ref => (this.collapseInnerElement = ref)}
                    style={{
                        overflow: 'hidden',
                        maxHeight: `${style.height}px`,
                    }}>
                        <span onTouchTap={() => toggleCollapseInfo()} className="collapseIcon">
                            <AnimatedExpandIcon isCollapsed={isCollapsed} />
                        </span>
                        <p>{text}</p>
                    </div>
                }
            </Motion>
        </div>
    );
}

export default Collapsible;