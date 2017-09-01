import store from './store';
import Match from '../classes/match';
import Team from '../classes/team';
import TeamMember from '../classes/teamMember';
import { insertMatchData, insertPlayerData } from '../actions/fetchData';
import SportRadarApi from './SportRadarApi';

export const getMatchData = (matchId) => {
    if (typeof store.getState().sportsInfo.matches[matchId] === 'undefined') {
        SportRadarApi.getMatchLineup(`sr:match:${matchId}`, (data) => {
            const containsLineupInfo = typeof data.lineup !== 'undefined';
            // Construct Match Data
            const matchDataForStore = new Match({
                id: matchId,
                home: {
                    team: {
                        ...data.sport_event.competitors.filter(val => val.qualifier === 'home')[0],
                        jersey: containsLineupInfo ? data.lineups.filter(val => val.team === 'home')[0].jersey : [],
                    },
                    lineup: {
                        ...containsLineupInfo ? data.lineups.filter(val => val.team === 'home')[0] : {},
                        name: data.sport_event.competitors.filter(val => val.qualifier === 'home')[0].name,
                    },
                },
                away: {
                    team: {
                        ...data.sport_event.competitors.filter(val => val.qualifier === 'away')[0],
                        jersey: containsLineupInfo ? data.lineups.filter(val => val.team === 'away')[0].jersey : [],
                    },
                    lineup: {
                        ...containsLineupInfo ? data.lineups.filter(val => val.team === 'away')[0] : {},
                        name: data.sport_event.competitors.filter(val => val.qualifier === 'away')[0].name,
                    },
                },
                // Probably will want to put the timeline data inside the match data in the future
            });

            store.dispatch(insertMatchData(matchId, matchDataForStore));
        });
    } else {
        console.log('Matchid already exists in store');
    }
};

export const getTeamData = (teamId) => {
    if (typeof store.getState().sportsInfo.teams[teamId] === 'undefined') {
        SportRadarApi.getTeamProfile(`sr:competitor:${teamId}`, (data) => {
            const teamDataForStore = new Team({
                id: teamId,
                key: teamId,
                title: data.name,
                logo: data.logo,
                img: data.img,
                description: data.description,
                colors: data.colors,
                abbr: data.abbr,
                players: data.players,
            });
            console.log(teamDataForStore); // TODO reformat team class
        });
    }
};

export const getPlayerData = (playerId, callback = () => {}) => {
    if (typeof store.getState().sportsInfo.players[playerId] === 'undefined') {
        SportRadarApi.getPlayerProfile(`sr:player:${playerId}`, (data) => {
            const teamMemberDataForStore = new TeamMember({
                id: playerId,
                name: data.player.name,
                type: data.player.type,
                nationality: {
                    name: data.player.nationality,
                    code: data.player.country_code,
                },
                dob: data.player.date_of_birth,
                height: data.player.height,
                statistics: data.statistics.totals,
                number: data.roles[0].jersey_number,
                roles: data.roles,
            });

            callback(teamMemberDataForStore);

            store.dispatch(insertPlayerData(playerId, teamMemberDataForStore));
        });
    }
};
