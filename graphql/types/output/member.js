const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const Member = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        avatar: { type: GraphQLString },
        overall: { type: GraphQLInt }
    })
})

module.exports = {
    Member
}