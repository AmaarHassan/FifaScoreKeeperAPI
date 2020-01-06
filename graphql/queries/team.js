const TeamService = require('../../services/team');
const TeamType = require('../types/output/team')
const QueryType = require('../types/general/query');
const queryBuilder = require('../../helpers/queryBuilder');

const {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

const teamService = new TeamService();

// an object to hold the queries of players
const TeamQueries = {
    // get all players matching the query
    teams: {
        type: new GraphQLList(TeamType.Team),
        args: {
            query: { type: QueryType }
        },
        resolve: async (parent, args) => {
            try {
                let query = args.query;
                query = queryBuilder(query);
                return await teamService.getAll(query);
            } catch (error) {
                return new Error(error)
            }
        }
    },
    // get single player matching the uuid
    team: {
        type: TeamType.Team,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (parent, args) => {
            try {
                const uuid = args.id;
                return await teamService.get(uuid);
            } catch (error) {
                return new Error(error)
            }
        }
    }
}


module.exports = TeamQueries