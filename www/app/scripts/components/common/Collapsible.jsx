import React from 'react';
import { Motion, spring } from 'react-motion';
import AnimatedExpandIcon from '../Icons/AnimatedExpandIcon';

const Collapsible = ({label, collapseInfo, toggleCollapseInfo, isCollapsed, children}) => {
    let collapseHeight = 0
    if (typeof this.collapseInnerElement !== 'undefined') {
        collapseHeight = this.collapseInnerElement.scrollHeight;
    }

    return (
        <div className="ox-content-inner">

            <div className="accordion" role="button" onTouchTap={() => toggleCollapseInfo()}> 
                <h4 className="accordion-label">{label}</h4>
                <AnimatedExpandIcon isCollapsed={isCollapsed} />
            </div>

            <Motion style={isCollapsed ? {height:spring(0)} : {height:spring(collapseHeight)}}>
                {style =>
                    <div 
                    className="collapsible"
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