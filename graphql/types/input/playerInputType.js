const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const CreatePlayerInputType = new GraphQLInputObjectType({
    name: 'CreatePlayerInput',
    fields: () => ({
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = {
    CreatePlayerInputType
}