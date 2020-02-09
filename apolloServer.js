const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema.js')
const validateToken = require('./middleware/validateToken')

const app = express();
app.use(bodyParser.json());
// to allow access from all addresses
app.use('*', cors({ origin: '*' }));

app.use(validateToken);

const apollo = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    playground: true
})

apollo.applyMiddleware({ app });
const server = http.createServer(app);

const startApolloServer = () => {
    server.listen({ port: 1338 }, () => {
        console.log(`Server ready at http://localhost:1338${apollo.graphqlpath}`)
    })
}

module.exports = {
    startApolloServer
}