import React from 'react';
import {
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Pokemon} from '../interfaces/pokemonInterfaces';
import {ThemeText} from './ThemeText';
import {FadeInImage} from './FadeInImage';
import {capitalize} from '../helpers/utils';

interface Props {
  pokemon: Pokemon;
}

export const PokemonDetails = ({pokemon}: Props) => {
  const dimensions = useWindowDimensions();
  const styles = stylesFunction(dimensions);

  return (
    <ScrollView
      style={{...styles.container, ...styles.absoluteFillObject}}
      showsVerticalScrollIndicator={false}>
      <View style={{...styles.containerInfo, ...styles.topSeparator}}>
        <ThemeText style={styles.title}>Types</ThemeText>
        <View style={styles.listContainer}>
          {pokemon.types.map(({type}) => (
            <ThemeText
              key={type.name}
              style={{...styles.regularText, ...styles.rightSeparator}}>
              {capitalize(type.name)}
            </ThemeText>
          ))}
        </View>
      </View>
      <View style={styles.containerInfo}>
        <ThemeText style={styles.title}>Weight</ThemeText>
        <View style={styles.listContainer}>
          <ThemeText style={{...styles.regularText, ...styles.rightSeparator}}>
            {`${pokemon.weight / 10} Kg`}
          </ThemeText>
        </View>
      </View>
      <View style={styles.containerInfo}>
        <ThemeText style={styles.title}>Sprites</ThemeText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprit}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprit}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprit}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprit}
          />
        </ScrollView>
      </View>
      <View style={styles.containerInfo}>
        <ThemeText style={styles.title}>Abilities</ThemeText>
        <View style={styles.listContainer}>
          {pokemon.abilities.map(({ability}) => (
            <ThemeText
              key={ability.name}
              style={{...styles.regularText, ...styles.rightSeparator}}>
              {capitalize(ability.name)}
            </ThemeText>
          ))}
        </View>
      </View>
      <View style={styles.containerInfo}>
        <ThemeText style={styles.title}>Moves</ThemeText>
        <View style={{...styles.listContainer, ...styles.wrapContainer}}>
          {pokemon.moves.map(({move}) => (
            <ThemeText
              key={move.name}
              style={{...styles.regularText, ...styles.rightSeparator}}>
              {capitalize(move.name)}
            </ThemeText>
          ))}
        </View>
      </View>
      <View style={styles.containerInfo}>
        <ThemeText style={styles.title}>Abilities</ThemeText>
        <View>
          {pokemon.stats.map(statBase => (
            <View style={styles.containerStat} key={statBase.stat.name}>
              <ThemeText
                style={{...styles.regularText, ...styles.statAttribute}}>
                {capitalize(statBase.stat.name)}
              </ThemeText>
              <ThemeText style={{...styles.regularText, ...styles.statValue}}>
                {statBase.base_stat.toString()}
              </ThemeText>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.finalSprite}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprit}
        />
      </View>
    </ScrollView>
  );
};

const stylesFunction = (dimensions: ScaledSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width:
        dimensions.width >= 650 ? dimensions.width * 0.5 : dimensions.width,
    },
    absoluteFillObject:
      dimensions.width >= 650 ? {} : {...StyleSheet.absoluteFillObject},
    containerInfo: {
      marginHorizontal: 20,
    },
    topSeparator: {
      marginTop: dimensions.width >= 650 ? 0 : 370,
    },
    title: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: 'bold',
    },
    regularText: {
      fontSize: 19,
    },
    listContainer: {
      flexDirection: 'row',
    },
    wrapContainer: {
      flexWrap: 'wrap',
    },
    rightSeparator: {
      marginRight: 10,
    },
    basicSprit: {
      width: 100,
      height: 100,
    },
    containerStat: {
      flexDirection: 'row',
    },
    statAttribute: {
      width: 160,
    },
    statValue: {
      fontWeight: 'bold',
    },
    finalSprite: {
      marginBottom: 50,
    },
  });
