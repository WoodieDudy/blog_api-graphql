const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema/schema.js')
const resolvers = require('./schema/resolvers.js')

const PORT = 8000;


mongoose.connect('mongodb+srv://test:assword@bloggraphqlapi.\
gfgzv.mongodb.net/blogGraphqlApi?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})


const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB.\n'));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
