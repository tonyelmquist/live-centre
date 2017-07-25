import React from 'react';

function CirclesRow (props) {
    return (
      <div className="horizontalScroll">
        <div className="horizontalScrollInner">
          {props.children}
        </div>
      </div>
    );
}

export default CirclesRow;
