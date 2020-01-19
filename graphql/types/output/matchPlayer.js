const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLList
} = require('graphql')
const { Goal } = require('./goal')
const { Team } = require('./team')
const { Player } = require('./player')
const PlayerService = require('../../../services/player')
const TeamService = require('../../../services/team')

const playerService = new PlayerService()
const teamService = new TeamService()

const MatchPlayer = new GraphQLObjectType({
    name: 'MatchPlayer',
    fields: () => ({
        player: {
            type: Player,
            resolve: async (parent, args) => {
                try {
                    return await playerService.get(parent.player)
                } catch (error) {
                    throw new Error(error)
                }
            }
        },
        team: {
            type: Team,
            resolve: async (parent, args) => {
                try {
                    return await teamService.get(parent.team)
                } catch (error) {
                    throw new Error(error)
                }
            }
        },
        goals: { type: new GraphQLList(Goal) },
        consensus: { type: GraphQLBoolean }
    })
})

module.exports = {
    MatchPlayer
}