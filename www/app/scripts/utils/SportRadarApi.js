import axios from 'axios';

let executingCall = false;
export default class SportRadarApi {
    static apiKeys = {
        soccer_other: 'g62afuuhreg6u5m9hyk3guyw',
        ncaamb: 'a5vwx8q99ac9kmgtetg4z4aw',
    };

    static getMatchLineup(matchId, callback, errorCallback = () => {}) {
        if (!executingCall) {
            executingCall = true;
            axios('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/fileGetContents', {
                method: 'POST',
                data: {
                    url: `https://api.sportradar.us/soccer-t3/other/en/matches/${matchId}/lineups.json?api_key=${SportRadarApi.apiKeys.soccer_other}`,
                },
                headers: {
                    Authorization: 'Basic mcAPI2o17-H35t-password',
                },
            }).then((response) => {
                executingCall = false;
                console.log('Retreived Lineup Data for match id: ', matchId, response);
                callback(response.data);
            }).catch((error) => {
                executingCall = false;
                console.error('Something went wrong with the api call in getMatchLineup', error);
                console.info('Attempting to get data summary instead');
                errorCallback(error);
                SportRadarApi.getMatchSummary(matchId, callback);
            });
        } else {
            console.warn('Already executing call, please wait');
        }
    }

    static getMatchSummary(matchId, callback) {
        if (!executingCall) {
            executingCall = true;
            axios('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/fileGetContents', {
                method: 'POST',
                data: {
                    url: `https://api.sportradar.us/soccer-t3/other/en/matches/${matchId}/summary.json?api_key=${SportRadarApi.apiKeys.soccer_other}`,
                },
                headers: {
                    Authorization: 'Basic mcAPI2o17-H35t-password',
                },
            }).then((response) => {
                executingCall = false;
                console.log('Retreived summart Data for player id: ', matchId, response);
                callback(response.data);
            }).catch((error) => {
                executingCall = false;
                console.error('Something went wrong with the api call in getMatchSummary', error);
            });
        } else {
            console.warn('Already executing call, please wait');
        }
    }

    static getMatchTimeline(matchId, callback, errorCallback = () => {}) {
        if (!executingCall) {
            executingCall = true;
            axios('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/fileGetContents', {
                method: 'POST',
                data: {
                    url: `https://api.sportradar.us/soccer-t3/other/en/matches/${matchId}/timeline.json?api_key=${SportRadarApi.apiKeys.soccer_other}`,
                },
                headers: {
                    Authorization: 'Basic mcAPI2o17-H35t-password',
                },
            }).then((response) => {
                executingCall = false;
                console.log('Retreived timeline Data for player id: ', matchId, response);
                callback(response.data);
            }).catch((error) => {
                executingCall = false;
                errorCallback(error);
                console.error('Something went wrong with the api call in getMatchTimeline', error);
            });
        } else {
            console.warn('Already executing call, please wait');
        }
    }

    static getTeamProfile(teamId, callback) {
        if (!executingCall) {
            executingCall = true;
            axios('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/fileGetContents', {
                method: 'POST',
                data: {
                    url: `https://api.sportradar.us/soccer-t3/other/en/teams/${teamId}/profile.json?api_key=${SportRadarApi.apiKeys.soccer_other}`,
                },
                headers: {
                    Authorization: 'Basic mcAPI2o17-H35t-password',
                },
            }).then((response) => {
                executingCall = false;
                console.log('Retreived profile Data for team id: ', teamId, response);
                callback(response.data);
            }).catch((error) => {
                executingCall = false;
                console.error('Something went wrong with the api call in getTeamProfile', error);
            });
        } else {
            console.warn('Already executing call, please wait');
        }
    }

    static getPlayerProfile(playerId, callback) {
        if (!executingCall) {
            executingCall = true;
            axios('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/fileGetContents', {
                method: 'POST',
                data: {
                    url: `https://api.sportradar.us/soccer-t3/other/en/players/${playerId}/profile.json?api_key=${SportRadarApi.apiKeys.soccer_other}`,
                },
                headers: {
                    Authorization: 'Basic mcAPI2o17-H35t-password',
                },
            }).then((response) => {
                executingCall = false;
                console.log('Retreived profile Data for player id: ', playerId, response);
                callback(response.data);
            }).catch((error) => {
                executingCall = false;
                console.error('Something went wrong with the api call in getPlayerProfile', error);
            });
        } else {
            console.warn('Already executing call, please wait');
        }
    }
}
