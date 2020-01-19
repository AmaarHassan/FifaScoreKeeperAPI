const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')

const Goal = new GraphQLObjectType({
    name: 'Goal',
    fields: () => ({
        executed: { type: GraphQLBoolean },
        member: { type: GraphQLString },
        time: { type: GraphQLInt }
    })
})

module.exports = {
    Goal
}