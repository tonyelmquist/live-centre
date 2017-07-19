import React from 'react';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36,
    }
};


const MasonryTileOverlay = (props) => {
	return (
        <div className="tile-overlay">
            <div className="tile-text">
                <h4>{props.text}</h4>
            </div>
            <IconButton
                className="masonryPlayButton"
                iconStyle={styles.mediumIcon}
                onTouchTap={() => { props.handleTilePlay }}
            >
                <PlayCircleOutline hoverColor={amber300} color={fullWhite} />
            </IconButton>
            
        </div>
	);
}

export default MasonryTileOverlay;

