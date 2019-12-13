const PlayerService = require('../../services/player');
const PlayerType = require('../types/output/players')
const QueryType = require('../types/general/query');
const queryBuilder = require('../../helpers/queryBuilder');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const playerService = new PlayerService();

// an object to hold the queries of players
const PlayerQueries = {
    // get all players matching the query
    players: {
        type: new GraphQLList(PlayerType.Player),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                return await playerService.getAll(query);
            } catch (error) {
                return new Error(error)
            }
        }
    },
    // get single player matching the uuid
    player: {
        type: PlayerType.Player,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (parent, args) => {
            try {
                const uuid = args.id;
                return await playerService.get(uuid);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}


module.exports = PlayerQueries