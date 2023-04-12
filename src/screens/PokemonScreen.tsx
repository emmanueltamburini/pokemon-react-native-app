import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ThemeText} from '../components/ThemeText';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/navigator';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route}: Props) => {
  const styles = stylesFunction();
  console.log(route.params);

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
