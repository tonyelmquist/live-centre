var React = require('react');
var FontAwesome = require('react-fontawesome');

const size="2x";


export function HomeIcon() {
    return (
        <FontAwesome
        className="tabIcons"
        name="home"
        size={size}
        />
    );
}

export function ProgramsIcon() {
    return (
        <FontAwesome
        className="tabIcons"
        name="th-list"
        size={size}
        />
    );
}

export function ChannelsIcon() {
    return (
        <FontAwesome
        className="tabIcons"
        name="globe"
        size={size}
        />
    );
}

export function SportIcon() {
    return (
        <FontAwesome
        className="tabIcons"
        name="trophy"
        size={size}
        />
    );
}