import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScaledSize,
} from 'react-native';
import {ThemeText} from './ThemeText';
import {TouchableIcon} from './TouchableIcon';
import {FadeInImage} from './FadeInImage';
import {capitalize, isColorTooLightForWhiteText} from '../helpers/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/navigator';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {
  simplePokemon: SimplePokemon;
  color: string;
}

export const PokemonHeader = ({navigation, simplePokemon, color}: Props) => {
  const {top} = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const styles = stylesFunction(color, top, dimensions);

  return (
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
        {capitalize(simplePokemon.name)}
        {`\n#${simplePokemon.id}`}
      </ThemeText>
      <Image
        source={require('../assets/white-pokeball.png')}
        style={styles.pokeballImage}
      />
      <FadeInImage uri={simplePokemon.picture} style={styles.pokemonImage} />
    </View>
  );
};

const stylesFunction = (color: string, top: number, dimensions: ScaledSize) =>
  StyleSheet.create({
    headerContainer: {
      height: 370,
      width:
        dimensions.width >= 650 ? dimensions.width * 0.5 : dimensions.width,
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
  });
