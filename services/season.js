const uuid = require('uuid/v4');
const MatchService = require('./match')
const PlayerService = require('./player');
const seasonModel = require('../models/season');
const winner = require('../helpers/winner');
const winnerByMatches = require('../helpers/winnerByMatches');

const matchService = new MatchService();
const playerService = new PlayerService();

module.exports = class SeasonService {

    async getAll(query) {
        try {
            return await seasonModel.getAll(query);
        } catch (error) {
            return new Error(error);
        }
    }

    async get(uuid) {
        try {
            if (!uuid) {
                throw new Error('Invalid uuid in params')
            }
            return await seasonModel.get(uuid);
        } catch (error) {
            return new Error(error);
        }
    }

    async insert(season) {
        try {
            season.uuid = uuid();
            return await seasonModel.insert(season);
        } catch (error) {
            return new Error(error);
        }
    }

    async getPlayerIdswithMatchesWonCount(season) {
        try {
            let players = [];
            let promiseArray = [];

            const seasonMatches = await matchService.getBySeason(season);

            seasonMatches.forEach((match) => {
                promiseArray.push(new Promise((resolve, reject) =>
                    resolve(winner(match.matchPlayers))
                ))
            });

            let matchWinners = await Promise.all(promiseArray);

            matchWinners.forEach(matchWinner => {
                matchWinner.forEach(winner => {
                    players[winner] = players[winner] ? players[winner] += 1 : 1
                })
            })

            return players;
        } catch (error) {

        }
    }

    async getPlayerIdswithGoalsCount(season) {
        try {
            let players = [];

            const seasonMatches = await matchService.getBySeason(season);

            seasonMatches.forEach((match) => {
                match.matchPlayers.forEach(matchPlayer => {
                    players[matchPlayer.player] = players[matchPlayer.player] ? players[matchPlayer.player] += matchPlayer.goals.length : matchPlayer.goals.length
                });
            });

            return players;
        } catch (error) {

        }
    }

    async getSeasonWinner(season) {
        try {
            const players = await this.getPlayerIdswithMatchesWonCount(season);
            return winnerByMatches(players)
        } catch (error) {
            return new Error(error);
        }
    }

    async getPlayersWithMatchesWon(season) {
        try {
            let promiseArray = [];
            let players = [];
            let playerWithMatches = [];
            let playersIdsWithMatchesWon = await this.getPlayerIdswithMatchesWonCount(season);

            for (let key in playersIdsWithMatchesWon) {
                promiseArray.push(new Promise((resolve, reject) =>
                    resolve(playerService.get(key))
                ))
            }

            players = await Promise.all(promiseArray);

            for (let key in playersIdsWithMatchesWon) {
                let player = players.find((player) => player.uuid === key)
                playerWithMatches.push({ ...player, matches: playersIdsWithMatchesWon[key] })
            }

            return playerWithMatches;
        } catch (error) {
            return new Error(error);
        }
    }

    async getPlayerWithGoalsCount(season) {
        try {
            let promiseArray = [];
            let players = [];
            let playerWithGoals = [];
            let playersIdsWithGoalsCount = await this.getPlayerIdswithGoalsCount(season);

            for (let key in playersIdsWithGoalsCount) {
                promiseArray.push(new Promise((resolve, reject) =>
                    resolve(playerService.get(key))
                ))
            }

            players = await Promise.all(promiseArray);

            for (let key in playersIdsWithGoalsCount) {
                let player = players.find((player) => player.uuid === key)
                playerWithGoals.push({ ...player, goals: playersIdsWithGoalsCount[key] })
            }

            return playerWithGoals;
        } catch (error) {
            return new Error(error);
        }
    }

    async getPlayerStats(season) {
        try {
            return await matchService.getPlayerIdsWithStats(season);
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}