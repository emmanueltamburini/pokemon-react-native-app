export const ALL_POKEMON_PATH = 'https://pokeapi.co/api/v2/pokemon/?limit=40';
export const SEARCH_POKEMON_PATH =
  'https://pokeapi.co/api/v2/pokemon/?limit=1500';
export const IMAGE_POKEMON_PATH = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const POKEMON_PATH = (id: string) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`;
