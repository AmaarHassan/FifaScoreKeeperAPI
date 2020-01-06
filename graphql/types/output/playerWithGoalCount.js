const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const PlayerWithGoalsCount = new GraphQLObjectType({
    name: 'PlayerWthGoalCount',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        uuid: { type: GraphQLString },
        goals: { type: GraphQLInt }
    })
})

module.exports = {
    PlayerWithGoalsCount
}