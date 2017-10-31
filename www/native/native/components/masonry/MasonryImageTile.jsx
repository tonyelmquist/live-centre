import React from 'react';
const MasonryImageTile = (props) => {
	return (
        <div className="tile">
            <div className="masonry_tile_inner" >
                <img
                className="thumbnail"
                onTouchTap={props.handleClick}
                src={props.poster}
                />
                {props.overlay}
            </div>
        </div>
	);
}

export default MasonryImageTile;
