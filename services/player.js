const uuid = require('uuid/v4');
const playerModel = require('../models/player');

module.exports = class PlayerService {

    async getAll(query) {
        try {
            const players = await playerModel.getAll(query);
            return players;
        } catch (error) {
            return new Error(error);
        }
    }

    async get(uuid) {
        try {
            if (!uuid) {
                throw new Error('Invalid uuid in params')
            }
            const player = await playerModel.get(uuid);
            return player
        } catch (error) {
            return new Error(error);
        }
    }

    async insert(player) {
        try {
            player.uuid = uuid();
            return await playerModel.insert(player);
        } catch (error) {
            return new Error(error);
        }
    }
}