import React, {useEffect, useState, useRef} from 'react';
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
import {getImageColors, isColorTooLightForWhiteText} from '../helpers/utils';

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const windowDimension = useWindowDimensions();
  const [bgColor, setBgColor] = useState('#979A9A');
  const styles = stylesFunction(windowDimension, bgColor);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    getImageColors(pokemon.picture).then(([primaryColor]) =>
      setBgColor(primaryColor ? primaryColor : bgColor),
    );

    return () => {
      isMounted.current = false;
    };
  }, [bgColor, pokemon.picture]);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        <View>
          <ThemeText style={styles.pokemonName} ignoreTheme>
            {pokemon.name.replace(/^\w/, c => c.toUpperCase())}
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

const stylesFunction = (windowDimension: ScaledSize, bgColor: string) =>
  StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      backgroundColor: bgColor,
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
      color: isColorTooLightForWhiteText(bgColor) ? 'black' : 'white',
      fontSize: 18,
      fontWeight: 'bold',
      top: 10,
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
