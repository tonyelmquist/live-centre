import React from 'react';
import Avatar from 'material-ui/Avatar';
import teamLogo from '../../../img/mockup/sport/soccer-teams/Real-Madrid-Logo.png';
import teamImg from '../../../img//mockup/sport/soccer-teams/Real-Madrid-Team.jpg'
const getPlayerItems = (team, players, openPlayerOverlay) => {
    const playerItems = [];
    for (const key in players) {
        playerItems.push(
      <li className="playerItem" key={`player-li-${key}`} onTouchTap={() => openPlayerOverlay(players[key])}>
        <Avatar size={70} src={players[key].portrait} className="avatar" />
        <h4>#{players[key].number} {players[key].name} </h4>
      </li>,
    );
    }
    return playerItems;
};

const TeamInfoSection = ({ team, players, openPlayerOverlay }) => (
        <div>
          <img className="teamImg" src={teamImg} />

          <div className="container-fluid">
            <div className="playerItem">
              <Avatar src={teamLogo} />
              <h3> {team.title}</h3>
            </div>
            <p> Founded in 6 March 1902 as Madrid Football Club, 
                the club has traditionally worn a white home kit since inception. 
                The word Real is Spanish for Royal and was bestowed to the club by 
                King Alfonso XIII in 1920 together with the royal crown in the emblem.  
            </p>

            <h4>Players:</h4>
            <ul className="playerList">
              {getPlayerItems(team, players, openPlayerOverlay)}
            </ul>
          </div>
        </div>
    );

export default TeamInfoSection;

