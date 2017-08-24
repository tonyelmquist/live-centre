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

    if (playerItems.length <= 0) {
        playerItems.push(
            <li className="playerItem">
              We have no records of players for this team available right now.
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
            <p> {team.description} </p>

            <h3>{i18next.t('sport_players')}</h3>
            <ul className="playerList">
              {getPlayerItems(team, players, openPlayerOverlay)}
            </ul>
          </div>
        </div>
    );

export default TeamInfoSection;

