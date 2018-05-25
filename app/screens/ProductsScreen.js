import React from 'react';
import {
  Text, 
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from "styled-components";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.6

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const TotalView = styled.View`
    background-color: #FCD500
    padding: 10px
`
const ProductView = styled.View`
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: #EEE;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
`;

const ProductContainer = styled.FlatList`
    background-color: #fff;
`;

const BaseText = styled(Text)`
    margin: 5px;
    font-weight: bold;
    text-align: center;
    color: #333
`

const HeaderText =  styled(BaseText)`
    font-size: 16px;
`

const ProductPhoto = styled(Image)`
	width: ${imageWidth}px;
	height: ${imageWidth}px;
`;

const DescpText =  styled(BaseText)`
    font-size: 30px;
`

const ButtonView = styled.View`
    flex-direction: row;
`

const BaseView = styled(TouchableOpacity)`
    height: 50px;
    margin: 5px;
    border-width: 1px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`

const RemoveButton = styled(BaseView)`
    flex: 1;
    border-color: #F54337;
`

const InfoView = styled(BaseView)`
    flex: 2;
    border-color: #EEE;
`

const AddButton = styled(BaseView)`
    flex: 1;
    border-color: #FCD500;
    background-color: #FCD500
`

const ProductsQuery = gql`
query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
    poc(id: $id) {
      products(categoryId: $categoryId, search: $search) {
        id
        productVariants{
            title
            description
            imageUrl
            price
        }
      }
    }
}  
`

class ProductsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_products: {},
            total: 0,
        }
    }

    handleSelectedProduct(product,add) {
        var product_variant = product.productVariants.length > 0 && product.productVariants[0]
        var current_selected_products = this.state.selected_products
        var current_selected_product = current_selected_products[product.id] ? current_selected_products[product.id] : { product: product_variant, count: 0 }
        current_selected_product.count = current_selected_product.count + add
        if (current_selected_product.count >= 0) {
            current_selected_products[product.id] = current_selected_product
            this.setState({selected_products: current_selected_products})

            this.setState({total: Object.keys(current_selected_products).reduce(function(total, key) {
                    return total + current_selected_products[key].product.price * current_selected_products[key].count
                }, 0)
            })
        }
        
        
    }
    
    renderProduct = ({ item: product }) => {
        return (
            <ProductView key={product.id}>
                <HeaderText>{product.productVariants.length > 0 && product.productVariants[0].title}</HeaderText>
                <ProductPhoto source={{ uri: product.productVariants.length > 0 && product.productVariants[0].imageUrl }} />
                <DescpText>{product.productVariants.length > 0 && product.productVariants[0].price}</DescpText>
                <ButtonView>
                    <RemoveButton onPress={() => this.handleSelectedProduct(product && product,-1) }>
                        <DescpText>{'-'}</DescpText>
                    </RemoveButton>
                    <InfoView>
                        <DescpText>{this.state.selected_products[product.id] && this.state.selected_products[product.id].count > 0 && this.state.selected_products[product.id].count}</DescpText>
                    </InfoView>
                    <AddButton onPress={() => this.handleSelectedProduct(product && product,1) }>
                        <DescpText>{'+'}</DescpText>
                    </AddButton>
                </ButtonView>
            </ProductView>
        );
    }

    render() {

        if (this.props.data.loading) {
            return (
                <Container>
                    <ActivityIndicator/>
                </Container>
            )
        }
        console.log(this.props)
        return (
            <View>
                <TotalView>
                    <HeaderText>{'Total: ' + this.state.total}</HeaderText>
                </TotalView>
                <ProductContainer
                    data={this.props.data.poc.products ? this.props.data.poc.products : []}
                    renderItem={this.renderProduct}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
        );
    }
}

export default graphql(ProductsQuery, { 
  options: (ownProps) => ({
  variables: {
    "id": ownProps.navigation.state.params.establishment.id.toString(),
    "search": "",
    "categoryId": ownProps.navigation.state.params.category ? ownProps.navigation.state.params.category.id : 0
  }
})})(ProductsScreen);