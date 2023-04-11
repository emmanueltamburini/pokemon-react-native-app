import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {HeaderTitle} from '../components/HeaderTitle';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {ThemeContext} from '../context/ThemeContext';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const styles = stylesFunction();
  const {theme} = useContext(ThemeContext);
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  const renderItem = (item: SimplePokemon) => <PokemonCard pokemon={item} />;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pokeball.png')}
        style={globalStyles().pokeballBg}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          ListHeaderComponent={<HeaderTitle title="Pokedex" />}
          data={simplePokemonList}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={pokemon => pokemon.id}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={
            <ActivityIndicator
              style={styles.activityIndicator}
              size={20}
              color={theme.dividerColor}
            />
          }
        />
      </View>
    </View>
  );
};

const stylesFunction = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      ...globalStyles().globalMargin,
    },
    flatListContainer: {
      alignItems: 'center',
    },
    activityIndicator: {
      height: 100,
    },
  });
