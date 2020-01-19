const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')
const { MatchPlayerInput } = require('./matchPlayer')

const CreateMatchInputType = new GraphQLInputObjectType({
    name: 'MatchInput',
    fields: () => ({
        playedAt: { type: GraphQLString },
        matchPlayers: { type: new GraphQLList(MatchPlayerInput) },
        season: { type: GraphQLString }
    })
})

module.exports = {
    CreateMatchInputType
}