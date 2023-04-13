import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  ScaledSize,
} from 'react-native';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {ThemeContext} from '../context/ThemeContext';
import {HeaderTitle} from '../components/HeaderTitle';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const SearchScreen = () => {
  const {theme} = useContext(ThemeContext);
  const dimensions = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const styles = stylesFunction(dimensions, top);

  const {isFetching, simplePokemonList} = usePokemonSearch();
  const renderItem = (item: SimplePokemon) => <PokemonCard pokemon={item} />;

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput style={styles.searchInput} />
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={
            <HeaderTitle title="Pokedex" style={styles.headerTitle} />
          }
          data={simplePokemonList}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={pokemon => pokemon.id}
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

const stylesFunction = (dimensions: ScaledSize, top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    activityIndicator: {
      height: 100,
    },
    listContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInput: {
      position: 'absolute',
      zIndex: 9999,
      width: dimensions.width - 20,
    },
    headerTitle: {
      marginTop: 70 + top,
    },
  });
