import React from 'react';
import FontAwesome from 'react-fontawesome';

const settingsIconStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    color: 'white',
    zIndex: '2000',
    opacity: 1,
};

const replayIconStyles = {
    ...settingsIconStyles,
    top: 'auto',
    right: 'auto',
    fontSize: '15px',
    left: '15px',
    bottom: '12px',
};

const highlightsIconStyles = {
    ...settingsIconStyles,
    top: 'auto',
    right: 'auto',
    bottom: '25px',
    left: '60px',
};

const PlayToggle = ({ onTouch, isPlaying }) => {
    if (isPlaying) {
        return (<FontAwesome
            className="play-toggle"
            name="pause"
            size="2x"
            onTouchTap={onTouch}
        />);
    }
    return (<FontAwesome
        className="play-toggle"
        name="play"
        size="2x"
        onTouchTap={onTouch}
    />);
};

const HighlightsControl = ({ onTouch }) => (
    <span><FontAwesome className="highlights-control" name="chevron-circle-up" style={highlightsIconStyles} onTouchTap={onTouch} />Highlights</span>
);

const SettingsControl = ({ onTouch }) => (
    <FontAwesome name="cog" className="settings-control" style={settingsIconStyles} onTouchTap={onTouch} />
);

const ReplayControl = ({ onTouch }) => (
    <FontAwesome name="undo" className="small-control" style={{ left: '15px' }} onTouchTap={onTouch} />
);

const VolumeControl = ({ onTouch }) => (
    <FontAwesome name="volume-up" className="small-control" style={{ left: '40px' }} onTouchTap={onTouch} />
);

export { HighlightsControl, PlayToggle, ReplayControl, SettingsControl, VolumeControl };
