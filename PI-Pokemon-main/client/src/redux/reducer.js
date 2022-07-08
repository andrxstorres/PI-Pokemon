import { GET_ALL_POKEMONS, GET_POKEMON_BY_NAME, GET_DETAIL_BY_ID, GET_ALL_TYPES, CREATE_POKEMON } from "./actions";

const initialState = {
  pokemons: [],
  details: {},
  types: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DETAIL_BY_ID:
      return {
        ...state,
        details: action.payload,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        details: action.payload.newPokemon,
      };
    default:
      return state;
  }
};
