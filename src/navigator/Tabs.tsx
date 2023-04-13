import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Navigator} from './Navigator';
import {SearchScreen} from '../screens/SearchScreen';
import {ThemeContext} from '../context/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type RootBottomTabParams = {
  NavigatorScreen: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<RootBottomTabParams>();

export const Tabs = () => {
  const {theme} = useContext(ThemeContext);
  const iconListFunction: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode = ({color}) => (
    <Icon name="list-outline" color={color} size={20} />
  );

  const iconSearchFunction: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode = ({color}) => (
    <Icon name="search-outline" color={color} size={25} />
  );

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="NavigatorScreen"
        sceneContainerStyle={{backgroundColor: theme.colors.background}}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: theme.backgroundOpacity,
            paddingBottom: Platform.OS === 'ios' ? 0 : 10,
            borderWidth: 0,
            elevation: 0,
            height: 65,
          },
        }}>
        <Tab.Screen
          name="NavigatorScreen"
          component={Navigator}
          options={{
            tabBarLabel: 'All',
            tabBarIcon: iconListFunction,
          }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: iconSearchFunction,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
