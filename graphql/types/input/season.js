const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const CreateSeasonInputType = new GraphQLInputObjectType({
    name: 'CreateSeasonInput',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        startedAt: { type: GraphQLString }
    })
})

module.exports = {
    CreateSeasonInputType
}