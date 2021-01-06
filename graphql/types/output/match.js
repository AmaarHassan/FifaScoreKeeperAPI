const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')
const { Season } = require("./season")
const { Player } = require('./player')
const { MatchPlayer } = require('./matchPlayer')
const winner = require('../../../helpers/winner')
const SeasonService = require('../../../services/season')
const PlayerService = require('../../../services/player')

const seasonService = new SeasonService()
const playerService = new PlayerService()

const Match = new GraphQLObjectType({
    name: 'Match',
    fields: () => ({
        playedAt: { type: GraphQLString },
        matchPlayers: { type: new GraphQLList(MatchPlayer) },
        winner: {
            type: new GraphQLList(Player),
            resolve: async (parent, args) => {
                try {
                    let winners = await winner(parent.matchPlayers)
                    return await playerService.getMultipleByUuids(winners)
                } catch (error) {
                    throw new Error(error)
                }
            }
        },
        season: {
            type: Season,
            resolve: async (parent, args) => {
                return await seasonService.get(parent.season)
            }
        },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Match
}