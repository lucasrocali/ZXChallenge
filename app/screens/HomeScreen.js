import React from 'react';
import { Text, 
    View, 
    Button, 
    TextInput, 
    TouchableOpacity } from 'react-native';
import styled from "styled-components";
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyCdOZlc7yeS8DUWqaU00c0MWOs3MlZoekM'); // use a valid API key

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const AdressInput = styled.TextInput`
    width: 100%;
    padding: 10px;
    height: 50px;
    background-color: #EFEFEF;
    text-align: center;
`;

const DescpText =  styled(Text)`
    margin: 10px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: #333
`

const BaseView = styled(TouchableOpacity)`
    height: 50px;
    margin: 5px;
    border-width: 1px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`

const ConfirmButton = styled(BaseView)`
    border-color: #FCD500;
    background-color: #FCD500
`

const CategoryButton = styled(BaseView)`
    border-color: #DDD;
`

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            address: "R. Américo Brasiliense, 1297, São Paulo - SP",
            category: null
        }
    }

    onSelectCategory = (category) => {
        this.setState({ category: category});
    };

    render() {
        return (
        <Container>
            <AdressInput
                placeholder="Entre o endereço"
                value={this.state.address}
                onChangeText={(text) => this.setState({address: text})}
                onSubmitEditing={() => console.log('done')}
            />
            <ConfirmButton
                onPress={() => {
                    Geocoder.from(this.state.address)
                    .then(json => {
                        var location = json.results[0].geometry.location;
                        this.props.navigation.navigate('Establishments',{lat: location.lat, lng: location.lng, category: this.state.category})
                    })
                    .catch(error => console.warn(error));
                }}
            >
                <DescpText>Buscar</DescpText>
            </ConfirmButton>
            <CategoryButton
                onPress={() => this.props.navigation.navigate('Categories',{ onSelectCategory: this.onSelectCategory })}
            >
                <DescpText>Categorias</DescpText>
            </CategoryButton>
            {
                this.state.category && <DescpText>{'Categoria: ' + this.state.category.title}</DescpText>
            }
        </Container>
        );
    }
}

export default HomeScreen;
