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
                style={{zIndex:999}}
                onTouchTap={() => closeTeamMemberOverlay()}
            />
            <div className="center">
                <div style={{position:'relative'}}>
                <img className="teamImg" src={teamMember.actionShot} />
                    <div className="gradient-overlay" />
                </div>
            </div>
            
            <div className="container-fluid">
                <h2 style={{margin: 0}}>#{teamMember.number} {teamMember.name} </h2>
                <div className="personal-info">
                    <h4>Team: Real Madrid</h4>
                    <ul className="TeamMember-stats-personal" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                        <li><b>Positions:</b> Forward, mid fielder</li>
                        <li><b>Birthdate:</b> 17/12/1990</li>
                        <li><b>Height:</b> 185cm</li>
                        <li><b>Weight:</b> 65kg</li>
                        <li><b>Nationality:</b> Portugal</li>
                    </ul>
                    <p>{teamMember.description}
                    </p>
                </div>
                <StatsMatches />
                <StatsMatches />
            </div>
        </div>
    </div>
);

export default TeamMemberOverlay;
