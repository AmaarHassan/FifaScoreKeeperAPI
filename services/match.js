const uuid = require('uuid/v4');
const matchModel = require('../models/match');

module.exports = class MatchService {

    async getAll(query) {
        try {
            const matches = await matchModel.getAll(query);
            return matches;
        } catch (error) {
            throw new Error(error);
        }
    }

    async get(uuid) {
        try {
            if (!uuid) {
                throw new Error('Invalid uuid in params')
            }
            const match = await matchModel.get(uuid);
            return match
        } catch (error) {
            throw new Error(error);
        }
    }

    async getBySeason(season) {
        try {
            if (!season) {
                throw new Error('Invalid season in params')
            }
            return await matchModel.getBySeason(season)
        } catch (error) {
            throw new Error(error);
        }
    }

    async insert(match) {
        try {
            match.uuid = uuid();
            return await matchModel.insert(match);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPlayerIdsWithStats(season) {
        try {
            const SeasonService = require('./season');
            const seasonService = new SeasonService();

            let playerStats = await matchModel.getPlayerIdsWithStats(season);
            for (let player in playerStats) {
                playerStats[player].player = playerStats[player]._id;
                delete playerStats[player]._id;
                playerStats[player].goals = playerStats[player].goals.flat(3)
            }

            const playerIdswithMatchesWon = await seasonService.getPlayerIdswithMatchesWonCount(season);

            playerStats.forEach(playerStat => {
                playerStat.matchesWon = playerIdswithMatchesWon[playerStat.player]
                    ? playerIdswithMatchesWon[playerStat.player]
                    : 0
            });

            return playerStats;
        } catch (error) {
            throw new Error('Could not get player with stats')
        }
    }
}