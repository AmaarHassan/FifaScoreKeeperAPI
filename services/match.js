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
}