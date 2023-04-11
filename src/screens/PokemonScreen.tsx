import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ThemeText} from '../components/ThemeText';

export const PokemonScreen = () => {
  const styles = stylesFunction();

  return (
    <ThemeText style={styles.container}>
      <Text>PokemonScreen</Text>
    </ThemeText>
  );
};

const stylesFunction = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
