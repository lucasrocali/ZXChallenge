import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';

export const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Products: {
        screen: ProductsScreen,
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
    }
  }, {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  });