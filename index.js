const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const { MONGODB } = require('./config.js');
const resolvers = require('./graphql/resolvers');



const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({req})
});

mongoose.connect(MONGODB,{useNewUrlParser:true})
	.then(() => {
		console.log("Connected to MongoDB");
		return server.listen({port:5000});
	})
	.then(res => {
		console.log(`Server running at ${res.url}`)
	});