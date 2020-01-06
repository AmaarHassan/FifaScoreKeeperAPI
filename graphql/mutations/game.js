const GameService = require('../../services/fifaGame')
const GameType = require('../types/output/game')
const { CreateGameInputType } = require('../types/input/game')
const gameService = new GameService()

const GameMutations = {
    createGame: {
        type: GameType.Game,
        args: {
            input: { type: CreateGameInputType }
        },
        resolve: async (parent, args) => {
            try {
                console.log(args)
                return await gameService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = GameMutations