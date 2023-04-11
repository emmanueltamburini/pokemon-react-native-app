import {StyleSheet} from 'react-native';

export const globalStyles = () =>
  StyleSheet.create({
    title: {
      fontSize: 35,
      fontWeight: 'bold',
    },
    globalMargin: {
      marginHorizontal: 20,
    },
    pokeballBg: {
      top: -100,
      right: -120,
      opacity: 0.2,
      position: 'absolute',
      width: 300,
      height: 300,
    },
  });
