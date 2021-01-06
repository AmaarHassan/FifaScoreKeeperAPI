const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')

const Player = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        uuid: { type: GraphQLString }
    })
})

module.exports = {
    Player
}