const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')
const { Goal } = require('./goal')

const MatchPlayerInput = new GraphQLInputObjectType({
    name: 'MatchPlayerInput',
    fields: () => ({
        // uuid of player
        player: { type: new GraphQLNonNull(GraphQLString) },
        // uuid of team
        team: { type: new GraphQLNonNull(GraphQLString) },
        goals: { type: new GraphQLList(Goal) },
        consensus: { type: GraphQLBoolean }
    })
})

module.exports = {
    MatchPlayerInput
}