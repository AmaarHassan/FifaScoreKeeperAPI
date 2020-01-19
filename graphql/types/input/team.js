const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const { MemberInputType } = require('./member')

const CreateTeamInputType = new GraphQLInputObjectType({
    name: 'CreateTeamInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        fifaGame: { type: new GraphQLNonNull(GraphQLString) },
        stars: { type: new GraphQLNonNull(GraphQLInt) },
        league: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: new GraphQLNonNull(GraphQLString) },
        attack: { type: new GraphQLNonNull(GraphQLInt) },
        midfield: { type: new GraphQLNonNull(GraphQLInt) },
        defence: { type: new GraphQLNonNull(GraphQLInt) },
        members: { type: new GraphQLList(MemberInputType) }
    })
})

module.exports = {
    CreateTeamInputType
}