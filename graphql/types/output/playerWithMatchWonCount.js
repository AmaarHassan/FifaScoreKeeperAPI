const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const PlayerWithMatchWonCount = new GraphQLObjectType({
    name: 'PlayerWthMatchesWonCount',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        uuid: { type: GraphQLString },
        matches: { type: GraphQLInt }
    })
})

module.exports = {
    PlayerWithMatchWonCount
}