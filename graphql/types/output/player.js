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
        uuid: { type: GraphQLString }
    })
})

const LoggedIn = new GraphQLObjectType({
    name: 'LoggedIn',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        uuid: { type: GraphQLString },
        token: { type: GraphQLString }
    })
})

module.exports = {
    LoggedIn,
    Player
}