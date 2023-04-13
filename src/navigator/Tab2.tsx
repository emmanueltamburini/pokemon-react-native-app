import React from 'react';
import {SearchScreen} from '../screens/SearchScreen';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/PokemonScreen';

export type RootBottomTabParams = {
  NavigatorScreen: undefined;
  SearchScreen: undefined;
};

export type RootTabSearchParams = {
  HomeScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
};

const TabSearch = createStackNavigator<RootTabSearchParams>();

export const Tab2Screen = () => {
  return (
    <TabSearch.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <TabSearch.Screen name="HomeScreen" component={SearchScreen} />
      <TabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </TabSearch.Navigator>
  );
};
