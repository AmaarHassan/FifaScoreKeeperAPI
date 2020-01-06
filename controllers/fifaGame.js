const uuid = require('uuid/v4');
const queryBuilder = require('../helpers/queryBuilder');
const FifaGameService = require('../services/fifaGame');
const fifaGameService = new FifaGameService();

const getAll = async (req, res) => {
    try {
        const query = queryBuilder(req.query);
        const result = await fifaGameService.getAll(query);
        res.send(result);
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
        const result = await fifaGameService.get(uuid);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

const insert = async (req, res) => {
    try {
        console.log('ere erejasdj lasdlkasl dkjaskldjalsjdlajdla sdj')
        const fifaGame = req.body;
        fifaGame.uuid = uuid();
        const result = await fifaGameService.insert(fifaGame);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    getAll,
    get,
    insert
}