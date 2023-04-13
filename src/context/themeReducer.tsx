import {Theme} from '@react-navigation/native';

type ThemeAction = {type: 'SET_LIGHT_THEME'} | {type: 'SET_DARK_THEME'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
  backgroundOpacity: string;
  secondaryBackground: string;
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  dividerColor: 'rgba(0,0,0,0.6)',
  backgroundOpacity: 'rgba(255,255,255,0.85)',
  secondaryBackground: '#F3F1F3',
  colors: {
    primary: '#084F6A',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'black',
    notification: 'teal',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  dividerColor: 'rgba(255,255,255,0.6)',
  backgroundOpacity: 'rgba(0,0,0,0.85)',
  secondaryBackground: '#A6A6A6',
  colors: {
    primary: '#75CEDB',
    background: 'grey',
    card: 'black',
    text: 'white',
    border: 'white',
    notification: 'teal',
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return {...lightTheme};

    case 'SET_DARK_THEME':
      return {...darkTheme};

    default:
      return state;
  }
};
