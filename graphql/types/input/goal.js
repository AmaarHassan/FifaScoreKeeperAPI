const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql')

const Goal = new GraphQLInputObjectType({
    name: 'GoalInput',
    fields: () => ({
        executed: { type: GraphQLBoolean },
        member: { type: GraphQLString },
        time: { type: GraphQLInt }
    })
})

module.exports = {
    Goal
}