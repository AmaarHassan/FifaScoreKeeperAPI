const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql')
const { Goal } = require('./goal')
const { Player } = require('./player');
const PlayerService = require('../../../services/player');

const playerService = new PlayerService();

const PlayerStats = new GraphQLObjectType({
    name: 'PlayerStats',
    fields: () => ({
        player: {
            type: Player,
            resolve: async (parent, args) => {
                return await playerService.get(parent.player);
            }
        },
        goals: { type: new GraphQLList(Goal) },
        totalGoals: {
            type: GraphQLInt,
            resolve: (parent, args) => {
                return parent.goals.length
            }
        },
        matchesWon: { type: GraphQLInt }
    })
})

module.exports = {
    PlayerStats
}