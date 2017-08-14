import React from 'react';
import FontAwesome from 'react-fontawesome';
import Avatar from 'material-ui/Avatar';
import StatsMatches from './StatsMatches';

const TeamMemberOverlay = ({ teamMember, closeTeamMemberOverlay }) => (
    <div className="sportTeamMemberOverlay">
        <div className="sportTeamMemberOverlayInner">
            <FontAwesome
                className="close-button"
                name="close"
                size="2x"
                onTouchTap={() => closeTeamMemberOverlay()}
            />
            
            <div className="container-fluid">
                <h2>{teamMember.name} - #{teamMember.number} </h2>
            </div>
            <div className="center">
                <img className="teamImg" src={teamMember.actionShot} />
            </div>
            
            <div className="container-fluid">
                <div className="personal-info">
                    <h4>Team: Real Madrid</h4>
                    <p>{teamMember.description}
                    </p>
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
    </div>
);

export default TeamMemberOverlay;
