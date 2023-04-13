import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator, Platform} from 'react-native';
import {ThemeText} from './ThemeText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/ThemeContext';

export const Loading = () => {
  const {top} = useSafeAreaInsets();
  const {theme} = useContext(ThemeContext);
  const styles = stylesFunction(top);

  return (
    <View style={{...styles.container, ...styles.centerElement}}>
      <ActivityIndicator size={50} color={theme.colors.primary} />
      <ThemeText>Loading...</ThemeText>
    </View>
  );
};

const stylesFunction = (top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? top : top + 10,
      marginVertical: 20,
    },
    centerElement: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
