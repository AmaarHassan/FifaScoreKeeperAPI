const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')
const GameService = require('../../../services/fifaGame')
const gameService = new GameService()
const { Member } = require('./member')

const Team = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        name: { type: GraphQLString },
        game: {
            type: require('./game').Game,
            resolve: async (parent, args) => {
                try {
                    return await gameService.get(parent.game)
                } catch (error) {
                    return new Error(error)
                }
            }
        },
        stars: { type: GraphQLInt },
        league: { type: GraphQLString },
        logo: { type: GraphQLString },
        attack: { type: GraphQLInt },
        midfield: { type: GraphQLInt },
        defence: { type: GraphQLInt },
        members: { type: new GraphQLList(Member) },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Team
}