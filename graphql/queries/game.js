const GameService = require('../../services/fifaGame');
const GameType = require('../types/output/game')
const QueryType = require('../types/general/query');
const queryBuilder = require('../../helpers/queryBuilder');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const gameService = new GameService();

// an object to hold the queries of players
const GameQueries = {
    // get all players matching the query
    games: {
        type: new GraphQLList(GameType.Game),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                return await gameService.getAll(query);
            } catch (error) {
                return new Error(error)
            }
        }
    },
    game: {
        type: GameType.Game,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (parent, args) => {
            try {
                const uuid = args.id;
                return await gameService.get(uuid);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}


module.exports = GameQueries