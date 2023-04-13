import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const styles = stylesFunction(top);
  return (
    <View style={styles.container}>
      <SearchInput />
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
  });
