import {useEffect, useRef, useState} from 'react';
import {POKEMON_PATH} from '../constant/path';
import {pokemonApi} from '../api/pokemonApi';
import {Pokemon} from '../interfaces/pokemonInterfaces';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();

  const loadPokemon = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<Pokemon>(POKEMON_PATH(id));
    setPokemon(resp.data);
    setIsLoading(false);
  };

  const loadPokemonStatic = useRef(loadPokemon);

  useEffect(() => {
    loadPokemonStatic.current();
  }, []);

  return {pokemon, isLoading};
};
