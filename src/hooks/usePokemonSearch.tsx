import {useEffect, useRef, useState} from 'react';
import {SEARCH_POKEMON_PATH, IMAGE_POKEMON_PATH} from '../constant/path';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadPokemons = async () => {
    setIsFetching(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      SEARCH_POKEMON_PATH,
    );
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = IMAGE_POKEMON_PATH(id);

      return {
        id,
        name,
        picture,
      };
    });

    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  const loadPokemonsStatic = useRef(loadPokemons);

  useEffect(() => {
    loadPokemonsStatic.current();
  }, []);

  return {simplePokemonList, isFetching};
};
