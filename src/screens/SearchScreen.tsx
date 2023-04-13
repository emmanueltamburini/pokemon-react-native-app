import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ScaledSize,
} from 'react-native';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {HeaderTitle} from '../components/HeaderTitle';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const SearchScreen = () => {
  const dimensions = useWindowDimensions();
  const {top} = useSafeAreaInsets();

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const {isFetching, simplePokemonList} = usePokemonSearch();

  useEffect(() => {
    if (searchTerm.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(searchTerm))) {
      setPokemonFiltered(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === searchTerm,
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [searchTerm, simplePokemonList]);

  const styles = stylesFunction(dimensions, top);

  const renderItem = (item: SimplePokemon) => <PokemonCard pokemon={item} />;

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput
        onDebounceChange={setSearchTerm}
        style={styles.searchInput}
      />
      <FlatList
        ListHeaderComponent={
          <HeaderTitle title={searchTerm} style={styles.headerTitle} />
        }
        data={pokemonFiltered}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const stylesFunction = (dimensions: ScaledSize, top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
      alignItems: 'center',
    },
    searchInput: {
      position: 'absolute',
      zIndex: 9999,
      width: dimensions.width - 20,
    },
    headerTitle: {
      marginTop: 70 + top,
      alignItems: 'center',
    },
  });
