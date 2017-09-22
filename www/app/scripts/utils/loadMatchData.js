import store from './store';
import Match from '../classes/match';
import Team from '../classes/team';
import TeamMember from '../classes/teamMember';
import { insertMatchData, insertPlayerData, insertTeamData } from '../actions/fetchData';
import SportRadarApi from './SportRadarApi';

export const getMatchData = (matchId) => {
    if (typeof store.getState().sportsInfo.matches[matchId] === 'undefined') {
        SportRadarApi.getMatchLineup(`sr:match:${matchId}`, (data) => {
            const containsLineupInfo = typeof data.lineups !== 'undefined';
            // Construct Match Data
            const matchDataForStore = new Match({
                id: matchId,
                home: {
                    team: {
                        ...data.sport_event.competitors.filter(val => val.qualifier === 'home')[0],
                        jersey: containsLineupInfo ? data.lineups.filter(val => val.team === 'home')[0].jersey : [{ jersey: {} }],
                    },
                    lineup: {
                        ...containsLineupInfo ? data.lineups.filter(val => val.team === 'home')[0] : { jersey: {} },
                        name: data.sport_event.competitors.filter(val => val.qualifier === 'home')[0].name,
                    },
                },
                away: {
                    team: {
                        ...data.sport_event.competitors.filter(val => val.qualifier === 'away')[0],
                        jersey: containsLineupInfo ? data.lineups.filter(val => val.team === 'away')[0].jersey : [{ jersey: {} }],
                    },
                    lineup: {
                        ...containsLineupInfo ? data.lineups.filter(val => val.team === 'away')[0] : { jersey: {} },
                        name: data.sport_event.competitors.filter(val => val.qualifier === 'away')[0].name,
                    },
                },
            });
            setTimeout(() => {
                SportRadarApi.getMatchTimeline(`sr:match:${matchId}`, (timelineData) => {
                    matchDataForStore.timeline = timelineData.timeline;
                    store.dispatch(insertMatchData(matchId, matchDataForStore));
                }, (err) => {
                    console.log('error occured, no timeline data inserted');
                    store.dispatch(insertMatchData(matchId, matchDataForStore));
                });
            }, 5000);
        });
    } else {
        console.log('Matchid already exists in store');
    }
};

export const getTeamData = (teamId, callback = () => {}) => {
    if (typeof store.getState().sportsInfo.teams[teamId] === 'undefined') {
        SportRadarApi.getTeamProfile(`sr:competitor:${teamId}`, (data) => {
            const players = data.players.map((value) => {
                return value.id.split('sr:player:')[1];
            });
            const teamDataForStore = new Team({
                id: teamId,
                key: teamId,
                title: data.team.name,
                logo: `${teamId}-logo.png`,
                img: `${teamId}-img.png`,
                abbr: data.team.abbreviation,
                players,
                venue: data.venue,
            });

            callback(teamDataForStore);

            store.dispatch(insertTeamData(teamId, teamDataForStore));

            // Get players in this team
            let count = 0;
            const getPlayerInterval = setInterval(() => {
                if (typeof players[count] !== 'undefined') {
                    getPlayerData(players[count]);
                } else {
                    clearInterval(getPlayerInterval);
                }
                count += 1;
            }, 5000);
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

export const getBasketballGameData = (matchId, callback = () => {}) => {
    if (typeof store.getState().sportsInfo.matches[matchId] === 'undefined') {
        SportRadarApi.getBasketballGameSummary(matchId, (data) => {
            // Construct Match Data
            const matchDataForStore = new Match({
                id: matchId,
                home: {
                    team: {
                        name: data.home.name,
                        market: data.home.market,
                        statistics: data.home.statistics,
                        sportRadarId: data.home.id,
                    },
                    lineup: data.home.players,
                },
                away: {
                    team: {
                        name: data.away.name,
                        market: data.away.market,
                        statistics: data.away.statistics,
                        sportRadarId: data.away.id,
                    },
                    lineup: data.away.players,
                },
            });

            callback(matchDataForStore);

            store.dispatch(insertMatchData(matchId, matchDataForStore));
        });
    } else {
        console.log('Matchid already exists in store');
    }
};