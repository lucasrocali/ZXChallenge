import React from 'react';
import { Text, View, Button } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const allCategoriesQuery = gql`
    query allCategoriesSearch {
        allCategory{
            title
            id
        }
    }
`

class CategoriesScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Categories</Text>
      </Container>
    );
  }
}

export default graphql(allCategoriesQuery, {name: 'allCategoriesQuery'})(CategoriesScreen)