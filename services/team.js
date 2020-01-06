const uuid = require('uuid/v4');
const teamModel = require('../models/team');

module.exports = class teamService {

    async getAll(query) {
        try {
            const teams = await teamModel.getAll(query);
            return teams;
        } catch (error) {
            return new Error(error);
        }
    }

    async get(uuid) {
        try {
            if (!uuid) {
                throw new Error('Invalid uuid in params')
            }
            const team = await teamModel.get(uuid);
            return team
        } catch (error) {
            return new Error(error);
        }
    }

    async getTeamsByGame(game) {
        try {
            if (!game) {
                throw new Error('Invalid uuid in params')
            }
            const teams = await teamModel.getByGame(game);
            return teams
        } catch (error) {
            throw new Error(error);
        }
    }

    async insert(team) {
        try {
            team.uuid = uuid();
            return await teamModel.insert(team);
        } catch (error) {
            return new Error(error);
        }
    }
}