import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import {Tabs} from './src/navigator/Tabs';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const App = () => {
  return (
    <AppState>
      <Tabs />
    </AppState>
  );
};

const AppState = ({children}: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
