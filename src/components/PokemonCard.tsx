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
import {
  capitalize,
  getImageColors,
  isColorTooLightForWhiteText,
} from '../helpers/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/navigator';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemon: SimplePokemon;
}

type navigationProp = StackNavigationProp<RootStackParams>;

export const PokemonCard = ({pokemon}: Props) => {
  const windowDimension = useWindowDimensions();
  const {navigate} = useNavigation<navigationProp>();

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
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})
      }>
      <View style={styles.cardContainer}>
        <View>
          <ThemeText style={styles.pokemonName} ignoreTheme>
            {capitalize(pokemon.name)}
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
      width: windowDimension.width >= 650 ? 140 : 100,
      height: windowDimension.width >= 650 ? 140 : 100,
      position: 'absolute',
      bottom: 0,
      right: 0,
      opacity: 0.5,
      overflow: 'hidden',
    },
    pokeballImage: {
      width: windowDimension.width >= 650 ? 140 : 100,
      height: windowDimension.width >= 650 ? 140 : 100,
      bottom: -25,
      right: -25,
    },
  });
