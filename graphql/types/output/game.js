const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')
const { Team } = require('./team')
const TeamService = require('../../../services/team')
const teamService = new TeamService()

const Game = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        name: { type: GraphQLString },
        year: { type: GraphQLString },
        poster: { type: GraphQLString },
        teams: {
            type: new GraphQLList(Team),
            resolve: async (parent, args) => {
                try {
                    return await teamService.getTeamsByGame(parent.uuid);
                } catch (error) {
                    return new Error(error)
                }
            }
        },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Game
}