import React from 'react';
import FontAwesome from 'react-fontawesome';
import PlayerStatsMatches from './PlayerStatsMatches';
import Avatar from 'material-ui/Avatar';

const SportPlayerOverlay = ({player, closePlayerOverlay}) => {
    console.log(player);
    return (
        <div className="sportPlayerOverlay">
            <div className="sportPlayerOverlayInner">
                <FontAwesome
                    className="close-button"
                    name="close"
                    size="2x"
                    onTouchTap={() => closePlayerOverlay()}
                />
                <div className="center">
                    <h1>{player.name} - #{player.number} </h1>
                    <Avatar size={170} src={player.portrait} className="avatar" />
                </div>
                <div className="personal-info">
                    <h4>Team: Real Madrid</h4>
                    <p> A portugese itnernational, Ronaldo was named
                        the bbest Portugese player of all time
                        by the portuguese football federation in 2015 </p>
                    <ul className="player-stats-personal">
                        <li>Positions: Forward, mid fielder</li>
                        <li>Birthdate: xx/xx/xxxx</li>
                        <li>Height: 185cm</li>
                        <li>Weight: 65kg</li>
                        <li>Nationality: Portugal</li>
                    </ul>
                </div>
                <h4>Stats</h4>
                <PlayerStatsMatches />
                <PlayerStatsMatches />
            </div>
        </div>
    );
};

export default SportPlayerOverlay;

/* <div className="playerStats">
    <h4>Stats</h4>
    <table>
        <tr>
            <th>Apps</th>
            <th>Mins</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>YC</th>
            <th>RC</th>
            <th>PS%</th>
            <th>Av.R</th>
        </tr>
        <tr>
            <td>29 </td>
            <td>2544 </td>
            <td>25 </td>
            <td>5 </td>
            <td>4 </td>
            <td>- </td>
            <td>80 </td>
            <td>7.18 </td>
        </tr>
    </table>
</div> */
