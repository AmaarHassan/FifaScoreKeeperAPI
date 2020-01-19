const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const CreateGameInputType = new GraphQLInputObjectType({
    name: 'CreateGameInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        poster: { type: GraphQLString }
    })
})

module.exports = {
    CreateGameInputType
}