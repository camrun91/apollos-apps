const ApolloServer = require.requireActual('@apollosproject/config').default;

ApolloServer.loadJs({
  DATABASE: {
    URL: `sqlite:${process.env.PWD}/testing.db`,
  },
});

export default ApolloServer;
