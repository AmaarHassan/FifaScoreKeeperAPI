const SeasonService = require('../../services/season')
const SeasonType = require('../types/output/season')
const { CreateSeasonInputType } = require('../types/input/season')
const seasonService = new SeasonService()

const SeasonMutations = {
    // create a player
    createSeason: {
        type: SeasonType.Season,
        args: {
            input: { type: CreateSeasonInputType }
        },
        resolve: async (parent, args) => {
            try {
                return await seasonService.insert(args.input);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = SeasonMutations