import React from 'react';

function HorizontalScrollContainer (props) {
    return (
      <div className="horizontalScroll">
        <div className="horizontalScrollInner">
          {props.children}
        </div>
      </div>
    );
}

export default HorizontalScrollContainer;
