import { GET_ALL_POKEMONS, GET_POKEMON_BY_NAME } from "./actions";

const initialState = {
  pokemons: [],
  details: {},
  searchedPokemon: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        details: action.payload,
      };
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return state;
  }
};
