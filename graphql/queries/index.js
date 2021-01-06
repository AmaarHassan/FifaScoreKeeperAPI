const PlayerQueries = require('./players')
const TeamQueries = require('./team')
const GameQueries = require('./game')
const MatchQueries = require('./match')
const SeasonQueries = require('./season')
const { GraphQLObjectType } = require('graphql')

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...PlayerQueries,
        ...TeamQueries,
        ...GameQueries,
        ...MatchQueries,
        ...SeasonQueries
    }
});

module.exports = { RootQuery }