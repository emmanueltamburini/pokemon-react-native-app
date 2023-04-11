import React from 'react';
import {
  Image,
  ScaledSize,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {ThemeText} from './ThemeText';

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const windowDimension = useWindowDimensions();
  const styles = stylesFunction(windowDimension);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        <View>
          <ThemeText style={styles.pokemonName} ignoreTheme>
            {pokemon.name}
            {`\n#${pokemon.id}`}
          </ThemeText>
        </View>
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/white-pokeball.png')}
            style={styles.pokeballImage}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.images} />
      </View>
    </TouchableOpacity>
  );
};

const stylesFunction = (windowDimension: ScaledSize) =>
  StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      backgroundColor: 'red',
      height: 120,
      width: windowDimension.width * 0.4,
      marginBottom: 25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    images: {
      height: 120,
      width: 120,
      position: 'absolute',
      right: -8,
      bottom: -5,
    },
    pokemonName: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      top: 20,
      left: 10,
    },
    pokeballContainer: {
      width: 100,
      height: 100,
      position: 'absolute',
      bottom: 0,
      right: 0,
      opacity: 0.5,
      overflow: 'hidden',
    },
    pokeballImage: {
      width: 100,
      height: 100,
      bottom: -25,
      right: -25,
    },
  });
