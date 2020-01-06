const MatchService = require('../../../services/match')
const PlayerService = require('../../../services/player')
const SeasonService = require('../../../services/season')
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql')

const matchService = new MatchService()
const seasonService = new SeasonService()
const playerService = new PlayerService()

const { PlayerWithMatchWonCount } = require('./playerWithMatchWonCount')
const { PlayerWithGoalsCount } = require('./playerWithGoalCount')
const { Player } = require('./player')

const Season = new GraphQLObjectType({
    name: 'Season',
    fields: () => ({
        title: { type: GraphQLString },
        startedAt: { type: GraphQLString },
        matches: {
            type: new GraphQLList(require('./match').Match),
            resolve: async (parent, args) => {
                try {
                    return await matchService.getBySeason(parent.uuid)
                } catch (error) {
                    return new Error(error)
                }
            }
        },
        winner: {
            type: new GraphQLList(Player),
            resolve: async (parent, args) => {
                try {
                    const winners = await seasonService.getSeasonWinner(parent.uuid);
                    return await playerService.getMultipleByUuids(winners);
                } catch (error) {
                    return new Error(error)
                }
            }
        },
        playerWithMatchesWon: {
            type: new GraphQLList(PlayerWithMatchWonCount),
            resolve: async (parent, args) => {
                return await seasonService.getPlayersWithMatchesWon(parent.uuid);
            }
        },
        playerWithGoalsCount: {
            type: new GraphQLList(PlayerWithGoalsCount),
            resolve: async (parent, args) => {
                return await seasonService.getPlayerWithGoalsCount(parent.uuid);
            }
        },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Season
}