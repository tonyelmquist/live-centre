import React from 'react';
import Avatar from 'material-ui/Avatar';
import i18next from 'i18next';

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
          <img className="teamImg" src={team.img} />

          <div className="container-fluid">
            <div className="playerItem">
              <Avatar src={team.logo} />
              <h3> {team.title}</h3>
            </div>
            <p> Founded in 6 March 1902 as Madrid Football Club, 
                the club has traditionally worn a white home kit since inception. 
                The word Real is Spanish for Royal and was bestowed to the club by 
                King Alfonso XIII in 1920 together with the royal crown in the emblem.  
            </p>

            <h4>{i18next.t('sport_players')}</h4>
            <ul className="playerList">
              {getPlayerItems(team, players, openPlayerOverlay)}
            </ul>
          </div>
        </div>
    );

export default TeamInfoSection;

