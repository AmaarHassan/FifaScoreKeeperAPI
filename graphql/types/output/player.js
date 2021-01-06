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

const LogoutType = new GraphQLObjectType({
    name: 'LoggedOut',
    fields: () => ({
        message: { type: GraphQLString}
    })
})

module.exports = {
    LoggedIn,
    LogoutType,
    Player
}