import React from 'react';
import FontAwesome from 'react-fontawesome';

const settingsIconStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    color: 'white',
    zIndex: '2000',
    fontSize: '25px',
    opacity: 1,
};

const replayIconStyles = {
    ...settingsIconStyles,
    top: 'auto',
    right: 'auto',
    left: '100px',
    bottom: '50px',
};

const highlightsIconStyles = {
    ...replayIconStyles,
    left: '160px',
};

const PlayToggle = ({ onTouch }) => (
    <FontAwesome className="playToggle" name="play-circle" onTouchTap={onTouch} />
);

const HighlightsControl = ({ onTouch }) => (
    <span><FontAwesome className="highlights-control" name="chevron-circle-up" style={highlightsIconStyles} onTouchTap={onTouch} />Highlights</span>
);

const ReplayControl = ({ onTouch }) => (
    <FontAwesome name="undo" className="replay-control" style={replayIconStyles} onTouchTap={onTouch} />
);

const SettingsControl = ({ onTouch }) => (
    <FontAwesome name="cog" className="settings-control" style={settingsIconStyles} onTouchTap={onTouch} />
);

export { HighlightsControl, PlayToggle, ReplayControl, SettingsControl };
