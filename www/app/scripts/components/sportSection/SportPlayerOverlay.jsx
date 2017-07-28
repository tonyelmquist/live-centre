import React from 'react';
import FontAwesome from 'react-fontawesome';
import Avatar from 'material-ui/Avatar';
import StatsMatches from './StatsMatches';

const TeamMemberOverlay = ({teamMember, closeTeamMemberOverlay}) => {
    console.log(teamMember);
    return (
        <div className="sportTeamMemberOverlay">
            <div className="sportTeamMemberOverlayInner">
                <FontAwesome
                    className="close-button"
                    name="close"
                    size="2x"
                    onTouchTap={() => closeTeamMemberOverlay()}
                />
                <div className="center">
                    <h1>{teamMember.name} - #{teamMember.number} </h1>
                    <Avatar size={170} src={teamMember.portrait} className="avatar" />
                </div>
                <div className="personal-info">
                    <h4>Team: Real Madrid</h4>
                    <p> A portugese itnernational, Ronaldo was named
                        the bbest Portugese TeamMember of all time
                        by the portuguese football federation in 2015 </p>
                    <ul className="TeamMember-stats-personal">
                        <li>Positions: Forward, mid fielder</li>
                        <li>Birthdate: xx/xx/xxxx</li>
                        <li>Height: 185cm</li>
                        <li>Weight: 65kg</li>
                        <li>Nationality: Portugal</li>
                    </ul>
                </div>
                <h4>Stats</h4>
                <StatsMatches />
                <StatsMatches />
            </div>
        </div>
    );
};

export default TeamMemberOverlay;
