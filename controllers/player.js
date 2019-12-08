const uuid = require('uuid/v4');
const playerModel = require('../models/player');

const getAll = async (req, res) => {
    try {
        const players = await playerModel.getAll();
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
        const player = await playerModel.get(uuid);
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
        const response = await playerModel.insert(player);
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