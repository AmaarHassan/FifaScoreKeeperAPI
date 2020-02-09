const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
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

    async getByEmail(email) {
        try {
            if (!email) {
                throw new Error('Invalid uuid in params')
            }
            const player = await playerModel.getByEmail(email);
            return player
        } catch (error) {
            return new Error(error);
        }
    }

    async getMultipleByUuids(uuids) {
        try {
            if (!uuids.length) {
                throw new Error('Invalid uuids')
            }
            return await playerModel.getMultipleByUuids(uuids)
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

    async updateFields(fields) {
        try {
            return await playerModel.updateFields(fields);
        } catch (error) {
            return new Error(error);
        }
    }
}