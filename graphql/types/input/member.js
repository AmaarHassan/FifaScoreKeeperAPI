const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} = require('graphql')

const MemberInputType = new GraphQLInputObjectType({
    name: 'MemberInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLString },
        overall: { type: new GraphQLNonNull(GraphQLInt) },
        captain: { type: GraphQLBoolean },
        sub: { type: GraphQLBoolean}
    })
})

module.exports = {
    MemberInputType
}