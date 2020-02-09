const MatchService = require('../../services/match');
const MatchType = require('../types/output/match')
const QueryType = require('../types/general/query');
const queryBuilder = require('../../helpers/queryBuilder');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const matchService = new MatchService();

const MatchQueries = {
    matches: {
        type: new GraphQLList(MatchType.Match),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args, ctx) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                return await matchService.getAll(query);
            } catch (error) {
                return new Error(error)
            }
        }
    },

    match: {
        type: MatchType.Match,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (parent, args) => {
            try {
                const uuid = args.id;
                return await matchService.get(uuid);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}


module.exports = MatchQueries