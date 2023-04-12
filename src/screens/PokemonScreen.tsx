import React from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {ThemeText} from '../components/ThemeText';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/navigator';
import {isColorTooLightForWhiteText} from '../helpers/utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {TouchableIcon} from '../components/TouchableIcon';
import {usePokemon} from '../hooks/usePokemon';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {color, simplePokemon} = route.params;
  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(simplePokemon.id);

  const styles = stylesFunction(color, top);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableIcon
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.popToTop()}
          name="arrow-back-outline"
          color={isColorTooLightForWhiteText(color) ? 'black' : 'white'}
          size={35}
        />
        <ThemeText ignoreTheme style={styles.pokemonName}>
          {simplePokemon.name.replace(/^\w/, c => c.toUpperCase())}
          {`\n#${simplePokemon.id}`}
        </ThemeText>
        <Image
          source={require('../assets/white-pokeball.png')}
          style={styles.pokeballImage}
        />
        <FadeInImage uri={simplePokemon.picture} style={styles.pokemonImage} />
      </View>
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      )}
    </View>
  );
};

const stylesFunction = (color: string, top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      height: 370,
      backgroundColor: color,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 1000,
      borderBottomLeftRadius: 1000,
    },
    backButton: {
      position: 'absolute',
      left: 10,
      top: top + 15,
    },
    pokemonName: {
      color: isColorTooLightForWhiteText(color) ? 'black' : 'white',
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20,
      top: top + 40,
    },
    pokeballImage: {
      height: 250,
      width: 250,
      bottom: -20,
      opacity: 0.7,
    },
    pokemonImage: {
      height: 250,
      width: 250,
      position: 'absolute',
      bottom: -15,
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
