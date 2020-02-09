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
    // for someone like admin to view all matches
    allMatches: {
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

    // matches for players to be able to see their own matches only
    matches: {
        type: new GraphQLList(MatchType.Match),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args, ctx) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                query.conditions = {
                    ...query.conditions,
                    matchPlayers: { $elemMatch: { player: ctx.req.player.uuid } }
                }
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
        resolve: async (parent, args, ctx) => {
            try {
                let query = queryBuilder({});
                const uuid = args.id;
                query.conditions = {
                    ...query.conditions,
                    uuid,
                    matchPlayers: {
                        $elemMatch: { player: ctx.req.player.uuid }
                    }
                }
                return await matchService.get(query);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}


module.exports = MatchQueries