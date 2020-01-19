const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const GoalStat = new GraphQLObjectType({
    name: 'GoalStat',
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
    GoalStat
}