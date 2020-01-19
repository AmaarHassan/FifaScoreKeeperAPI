const MatchService = require('../../services/match')
const MatchType = require('../types/output/match')
const{ CreateMatchInputType } = require('../types/input/match')
const matchService = new MatchService()

const MatchMutations = {
    // create a player
    createMatch: {
        type: MatchType.Match,
        args: {
            input: { type: CreateMatchInputType }
        },
        resolve: async (parent, args) => {
            try {
                return await matchService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = MatchMutations