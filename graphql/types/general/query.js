const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql')
const { GraphQLJSON } = require('graphql-type-json');

const QueryType = new GraphQLInputObjectType({
    name: 'QueryType',
    fields: () => ({
        filter: { type: GraphQLJSON },
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        order: { type: GraphQLJSON },
        conditions: { type: GraphQLJSON }
    })
})

module.exports = QueryType