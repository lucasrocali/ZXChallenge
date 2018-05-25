import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import EstablishmentsScreen from '../screens/EstablishmentsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

export const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Establishments: {
      screen: EstablishmentsScreen,
    },
    Products: {
        screen: ProductsScreen,
    }
});

export const CategoriesStack = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  }
});

export const MainScreenStack = createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
      }
    }
);

export const RootStack = createStackNavigator({
    Main: {
      screen: MainScreenStack,
    },
    Categories: {
      screen: CategoriesStack
    }
  }, {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  });