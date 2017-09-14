import FontAwesome from 'react-fontawesome';
import React from 'react';

const PrePlayOverlay = ({video, maximized, orientation, isPreOverlayShowing, onPrePlayTouch, onCloseTouch, onMinimizeTouch}) => {
    if (typeof video !== 'undefined' && video !== null &&
        video.paused &&
        video.currentTime === 0 &&
        isPreOverlayShowing &&
        maximized) {
        return (<div className="pre-play-overlay" onTouchTap={onPrePlayTouch}>
                    {orientation === "PORTRAIT" ? <div className="gradient-overlay" /> : ''}
                    <div className="play-button" >
                        <FontAwesome
                            name="play"
                            size="2x"
                        />
                    </div>
                    <FontAwesome
                        className="close-button"
                        name="close"
                        size="2x"
                        onTouchTap={onCloseTouch}
                    />
                    <FontAwesome
                        className="minimize-button"
                        name="chevron-down"
                        size="2x"
                        onTouchTap={onMinimizeTouch}
                    />
                </div>);
    }

    return <span />;
};

export default PrePlayOverlay;
