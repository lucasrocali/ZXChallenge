import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

export const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
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