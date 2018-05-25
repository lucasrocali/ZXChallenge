import React from 'react';
import {
  Text, 
  View,
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

const EstablishmentView = styled.View`
    padding: 20px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: #EEE;
    margin: 10px;
    border-radius: 5px;
`;

const EstablishmentContainer = styled.FlatList`
	background-color: #fff;
`;

const BaseText = styled(Text)`
    margin: 5px;
    text-align: center;
    color: #333
`

const HeaderText =  styled(BaseText)`
    font-size: 18px;
    font-weight: bold;
`

const DescpText =  styled(BaseText)`
    font-size: 14px;
`
const BaseView = styled(TouchableOpacity)`
    height: 50px;
    margin: 10px;
    border-width: 1px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    border-color: #FCD500;
    background-color: #FCD500
`

const establishmentsQuery = gql`
query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
  pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
    __typename
    id
    status
    tradingName
    officialName
    deliveryTypes {
      __typename
      pocDeliveryTypeId
      deliveryTypeId
      price
      title
      subtitle
      active
    }
    paymentMethods {
      __typename
      pocPaymentMethodId
      paymentMethodId
      active
      title
      subtitle
    }
    pocWorkDay {
      __typename
      weekDay
      active
      workingInterval {
        __typename
        openingTime
        closingTime
      }
    }
    address {
      __typename
      address1
      address2
      number
      city
      province
      zip
      coordinates
    }
    phone {
      __typename
      phoneNumber
    }
  }
}
`

class EstablishmentsScreen extends React.Component {
    
    renderEstablishment = ({ item: establishment }) => {
        console.log(establishment)
        return (
            <EstablishmentView key={establishment.id}>
                <HeaderText>{establishment.tradingName}</HeaderText>
                <DescpText>{establishment.address && establishment.address.address1 + ' ' + establishment.address.number + ' - '  + establishment.address.city + ', '  + establishment.address.province}</DescpText>
                <DescpText>{establishment.phone && establishment.phone.phoneNumber}</DescpText>
                <BaseView onPress={() => {
                      this.props.navigation.navigate('Products',{ establishment: establishment, category: this.props.navigation.state.params.category })
                  }}>
                  <HeaderText>{'Produtos >'}</HeaderText>
                </BaseView>
            </EstablishmentView>
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
        return (
            <EstablishmentContainer
                data={this.props.data.pocSearch ? this.props.data.pocSearch : []}
                renderItem={this.renderEstablishment}
                keyExtractor={(item, index) => index.toString()}

            />
        );
    }
}

export default graphql(establishmentsQuery, { 
  options: (ownProps) => ({
  variables: {
    algorithm: "NEAREST",
    lat: ownProps.navigation.state.params.lat.toString(),
    long: ownProps.navigation.state.params.lng.toString(),
    now: "2017-08-01T20:00:00.000Z"
  }
})})(EstablishmentsScreen);