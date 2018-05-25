import React from 'react';
import { 
    Text, 
    View, 
    Button,
    FlatList,
    ActivityIndicator,
    TouchableOpacity } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const CategoryView = styled.View`
    height: 50px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-color: #EEE;
`;

const CategoriesContainer = styled.FlatList`
	background-color: #fff;
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

    renderCategory = ({ item: category }) => {
        return (
            <TouchableOpacity key={category.id} onPress={() => {
                    this.props.navigation.state.params.onSelectCategory(category)
                    this.props.navigation.goBack(null)
                }}>
                <CategoryView>
                    <Text>{category.title}</Text>
                </CategoryView>
            </TouchableOpacity>
        );
    }

    render() {
        console.log(this.props)
        if (this.props.allCategoriesQuery.loading) {
            return (
                <Container>
                    <ActivityIndicator/>
                </Container>
            )
        }
        return (
            <CategoriesContainer
                data={this.props.allCategoriesQuery.allCategory ? this.props.allCategoriesQuery.allCategory : []}
                renderItem={this.renderCategory}
                keyExtractor={(item, index) => index.toString()}

            />
        );
    }
}

export default graphql(allCategoriesQuery, {name: 'allCategoriesQuery'})(CategoriesScreen)