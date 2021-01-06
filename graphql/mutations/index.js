const PlayerMutations = require('./players');
const TeamMutations = require('./team')
const GameMutations = require('./game')
const MatchMutations = require('./match')
const SeasonMutations = require('./season')
const { GraphQLObjectType } = require('graphql')

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...PlayerMutations,
        ...TeamMutations,
        ...GameMutations,
        ...MatchMutations,
        ...SeasonMutations
    }
});

module.exports = { RootMutation }