import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {HeaderTitle} from '../components/HeaderTitle';

export const HomeScreen = () => {
  const styles = stylesFunction();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pokeball.png')}
        style={globalStyles().pokeballBg}
      />
      <HeaderTitle title="Pokedex" />
    </View>
  );
};

const stylesFunction = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      ...globalStyles().globalMargin,
    },
  });
