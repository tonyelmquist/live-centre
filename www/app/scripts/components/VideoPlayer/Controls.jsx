import React from 'react';
import FontAwesome from 'react-fontawesome';

const settingsIconStyles = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    fontSize: '20px',
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
    <FontAwesome className="small-control bottom" style={{ left: '30px' }} name="chevron-circle-up" onTouchTap={onTouch} />
);

const SettingsControl = ({ onTouch }) => (
    <FontAwesome name="cog" className="small-control" style={settingsIconStyles} onTouchTap={onTouch} />
);

const ReplayControl = ({ onTouch }) => (
    <FontAwesome name="undo" className="small-control bottom" onTouchTap={onTouch} />
);

const VolumeControl = ({ onTouch }) => (
    <FontAwesome name="volume-up" className="small-control bottom" onTouchTap={onTouch} />
);

const ForwardControl = ({ onTouch, extraStyle }) => (
    <FontAwesome name="step-forward" style={extraStyle} className="step-forward" size="2x" onTouchTap={onTouch} />
);

const BackwardControl = ({ onTouch, extraStyle }) => (
    <FontAwesome name="step-backward" style={extraStyle} className="step-backward" size="2x" onTouchTap={onTouch} />
);

export { HighlightsControl, PlayToggle, ReplayControl, SettingsControl, VolumeControl, ForwardControl, BackwardControl };
