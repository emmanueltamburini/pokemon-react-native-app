import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  useWindowDimensions,
  ScaledSize,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Tab1';
import {isColorTooLightForWhiteText} from '../helpers/utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';
import {PokemonHeader} from '../components/PokemonHeader';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {color, simplePokemon} = route.params;
  const {top} = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {pokemon, isLoading} = usePokemon(simplePokemon.id);

  const styles = stylesFunction(color, top, dimensions);

  return (
    <View style={styles.container}>
      <PokemonHeader
        simplePokemon={simplePokemon}
        color={color}
        navigation={navigation}
        route={route}
      />
      {isLoading || !pokemon ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const stylesFunction = (color: string, top: number, dimensions: ScaledSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: dimensions.width >= 650 ? 'row' : 'column',
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
