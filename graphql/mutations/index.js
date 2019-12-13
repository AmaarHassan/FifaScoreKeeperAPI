const PlayerMutations = require('./players');
const { GraphQLObjectType } = require('graphql')

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...PlayerMutations
    }
});

module.exports = { RootMutation }