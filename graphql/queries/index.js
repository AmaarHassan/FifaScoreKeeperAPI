const PlayerQueries = require('./players');
const { GraphQLObjectType } = require('graphql')

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...PlayerQueries
    }
});

module.exports = { RootQuery }