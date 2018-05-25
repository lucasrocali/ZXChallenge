import React from 'react';
import { Text, View, Button } from 'react-native';
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Home</Text>
        <Button
          title="Go to Products"
          onPress={() => this.props.navigation.navigate('Products')}
        />
        <Button
          title="Go to Categories"
          onPress={() => this.props.navigation.navigate('Categories')}
        />
      </Container>
    );
  }
}

export default HomeScreen;
