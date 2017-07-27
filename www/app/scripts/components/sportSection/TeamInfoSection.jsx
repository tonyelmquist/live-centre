import React from 'react';
import Avatar from 'material-ui/Avatar';

const getPlayerItems = (team, players, openPlayerOverlay) => {
    const playerItems = [];
    for (const key in team.players) {
        const playerKey = team.players[key];
        const player = players[playerKey];
        playerItems.push(
      <li className="playerItem" key={`player-li-${key}`} onTouchTap={() => openPlayerOverlay(player)}>
        <Avatar size={70} src={player.portrait} className="avatar" />
        <h4>#{player.number} {player.name} </h4>
      </li>,
    );
    }
    return playerItems;
};

const TeamInfoSection = ({ team, players, openPlayerOverlay }) => (
        <div>
          <img className="teamImg" src={team.img} />

          <div className="container-fluid">
            <div className="playerItem">
              <Avatar src={team.logo} />
              <h3> {team.title}</h3>
            </div>

            <h4>Players:</h4>
            <ul className="playerList">
              {getPlayerItems(team, players, openPlayerOverlay)}
            </ul>
          </div>
        </div>
    );

export default TeamInfoSection;

