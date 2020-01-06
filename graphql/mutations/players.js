const PlayerService = require('../../services/player')
const PlayerType = require('../types/output/player')
const { CreatePlayerInputType } = require('../types/input/playerInputType')
const playerService = new PlayerService()

const PlayerMutations = {
    // create a player
    createPlayer: {
        type: PlayerType.Player,
        args: {
            input: { type: CreatePlayerInputType }
        },
        resolve: async (parent, args) => {
            try {
                return await playerService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = PlayerMutations