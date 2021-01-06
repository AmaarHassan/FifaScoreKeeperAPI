const uuid = require('uuid/v4');
const gameModel = require('../models/fifaGame');

module.exports = class fifaGameService {

    async getAll(query) {
        try {
            const games = await gameModel.getAll(query);
            return games;
        } catch (error) {
            throw new Error(error);
        }
    }

    async get(uuid) {
        try {
            if (!uuid) {
                throw new Error('Invalid uuid in params')
            }
            const game = await gameModel.get(uuid);
            return game
        } catch (error) {
            throw new Error(error);
        }
    }

    async insert(game) {
        try {
            game.uuid = uuid();
            return await gameModel.insert(game);
        } catch (error) {
            throw new Error(error);
        }
    }
}