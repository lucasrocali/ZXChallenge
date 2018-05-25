import React from 'react';
import RootNavigation from './app/navigation/RootNavigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql',
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootNavigation/>
      </ApolloProvider>
    );
  }
}