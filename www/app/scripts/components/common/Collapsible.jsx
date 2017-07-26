import AnimatedExpandIcon from '../animatedIcons/AnimatedExpandIcon';
import React from 'react';
import { Motion, spring } from 'react-motion';

const collapseStyle = {
    color: 'red',
};


const Collapsible = ({label, collapseInfo, toggleCollapseInfo, isCollapsed, children}) => {
    let collapseHeight = 0
    if (typeof this.collapseInnerElement !== 'undefined') {
        collapseHeight = this.collapseInnerElement.scrollHeight;
        console.log("col", collapseHeight);
    }

    return (
        <div className="ox-content-inner">
            <div className="accordion" onTouchTap={() => toggleCollapseInfo()}> 
                <span className="accordion-label">{label}</span>
                <AnimatedExpandIcon isCollapsed={isCollapsed} />
            </div>
            <Motion style={isCollapsed ? {height:spring(0)} : {height:spring(collapseHeight)}}>
                {style =>
                    <div 
                    id="test"
                    ref={ref => (this.collapseInnerElement = ref)}
                    style={{
                        overflow: 'hidden',
                        maxHeight: `${style.height}px`,
                    }}>
                        {children}
                    </div>
                }
            </Motion>
        </div>
    );
}

export default Collapsible;