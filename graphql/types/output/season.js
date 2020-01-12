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

const { PlayerStats } = require('./playerStats')
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
        playerStats: {
            type: new GraphQLList(PlayerStats),
            resolve: async (parent, args) => {
                const result = await seasonService.getPlayerStats(parent.uuid);
                return result;
            }
        },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Season
}