import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const AdressInput = styled.TextInput`
    height: 50px;
`;

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            address: null,
            category: null
        }
      }

    onSelectCategory = (category) => {
        console.log(category)
        console.log(this.state)
        this.setState({ category: category});
    };

    render() {
        return (
        <Container>
            <Text>Home</Text>
            <AdressInput
                placeholder="Entre o endereço"
                value={this.state.address}
                onChangeText={(text) => this.setState({address: text})}
                onSubmitEditing={() => console.log('done')}
            />
            <Button
                title="Buscar"
                onPress={() => this.props.navigation.navigate('Products')}
            />
            <Button
                title="Go to Categories"
                onPress={() => this.props.navigation.navigate('Categories',{ onSelectCategory: this.onSelectCategory })}
            />
            {
                this.state.category && <Text>{this.state.category.title}</Text>
            }
        </Container>
        );
    }
}

export default HomeScreen;
