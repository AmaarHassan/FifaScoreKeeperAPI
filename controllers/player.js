const uuid = require('uuid/v4');
const queryBuilder = require('../helpers/queryBuilder');
const PlayerService = require('../services/player');
const playerService = new PlayerService();

const getAll = async (req, res) => {
    try {
        const query = queryBuilder(req.query);
        const players = await playerService.getAll(query);
        res.send(players);
    } catch (error) {
        res.send(error);
    }
}

const get = async (req, res) => {
    try {
        const { uuid } = req.params;
        if (!uuid) {
            throw new Error('Invalid uuid in params')
        }
        const player = await playerService.get(uuid);
        res.send(player);
    } catch (error) {
        res.send(error);
    }
}

const insert = async (req, res) => {
    try {
        const player = req.body;
        // attach uuid with player
        player.uuid = uuid();
        const response = await playerService.insert(player);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    getAll,
    get,
    insert
}