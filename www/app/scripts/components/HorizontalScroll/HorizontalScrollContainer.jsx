import React from 'react';

function HorizontalScrollContainer(props) {
    return (
      <div className="horizontalScroll-outer" style={{ height: `${props.height}px` }}>
        <div className="horizontalScroll">
          <div className="horizontalScrollInner">
            {props.children}
          </div>
        </div>
      </div>
    );
}

export default HorizontalScrollContainer;
