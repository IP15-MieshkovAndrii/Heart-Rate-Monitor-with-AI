import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('firebaseToken') || ''}`,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export {apolloClient}