import React from 'react';
import Avatar from 'material-ui/Avatar';

const getPlayerItems = (team, players) => {
  const playerItems = [];
  for(const key in team.players){
    console.log(key, team.players[key], players);
    const playerKey = team.players[key];
    const player = players[playerKey];
    playerItems.push(
      <li className="playerItem" key={`player-li-${key}`}><img src={player.portrait}/> <h4>#{player.number} {player.name} </h4></li>
    );
  }
  return playerItems
}

const TeamInfoSection = ({team, players}) => {
    return (
        <div>
          <img className="teamImg" src={team.img}/>

          <div className="container-fluid">
            <div className="playerItem">
              <Avatar src={team.logo}/> 
              <h4> {team.title}</h4>
            </div>

            <h3>Players:</h3>
            <ul className="playerList">
              {getPlayerItems(team, players)}
            </ul>
          </div>
        </div>
    );
};

export default TeamInfoSection;


