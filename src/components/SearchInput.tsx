import React, {useContext} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeState} from '../context/themeReducer';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchInput = () => {
  const {theme} = useContext(ThemeContext);

  const styles = stylesFunction(theme);
  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search Pokemon"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          placeholderTextColor={theme.colors.text}
        />
        <Icon name="search-outline" size={23} color={theme.colors.text} />
      </View>
    </View>
  );
};

const stylesFunction = (theme: ThemeState) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10,
    },
    textBackground: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryBackground,
      borderRadius: 50,
      height: 40,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
    },
    textInput: {
      flex: 1,
      fontSize: 18,
      top: Platform.OS === 'ios' ? 0 : 4,
      color: theme.colors.text,
    },
  });
