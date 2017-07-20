import React from 'react';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import { amber300, fullWhite } from 'material-ui/styles/colors';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36,
    }
};


const MasonryTextOverlay = ({title, handleTilePlay, video}) => {
    return (
        <div className="tile-overlay">
            <div className="tile-text">
                <h4>{video.title}</h4>
            </div>
            <IconButton
                className="masonryPlayButton"
                iconStyle={styles.mediumIcon}
                // style={styles.medium}
                onTouchTap={() => { handleTilePlay(video); }}
            >
                <PlayCircleOutline hoverColor={amber300} color={fullWhite} />
            </IconButton>
        </div>
    );
}


export default MasonryTextOverlay;

