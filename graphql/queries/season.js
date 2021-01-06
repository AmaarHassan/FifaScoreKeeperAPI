const SeasonService = require('../../services/season')
const MatchService = require('../../services/match')
const MatchType = require('../types/output/match')
const SeasonType = require('../types/output/season')
const QueryType = require('../types/general/query')
const queryBuilder = require('../../helpers/queryBuilder')

const matchService = new MatchService()

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const seasonService = new SeasonService();

const SeasonQueries = {
    seasons: {
        type: new GraphQLList(SeasonType.Season),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                return await seasonService.getAll(query);
            } catch (error) {
                return new Error(error)
            }
        }
    },

    season: {
        type: SeasonType.Season,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (parent, args) => {
            try {
                const uuid = args.id;
                return await seasonService.get(uuid);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}

module.exports = SeasonQueries