import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_DETAIL_BY_ID,
  GET_ALL_TYPES,
  CREATE_POKEMON,
  ERROR_GETTING_DETAIL,
  ERROR_CREATING_POKEMON,
  ERROR_GETTIN_EM_ALL,
} from "./actions";

const initialState = {
  pokemons: [],
  details: {},
  types: [],
  searchError: null,
  createError: null,
  gettingAllError: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_NAME:
      console.log(action.payload);
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
    case ERROR_GETTING_DETAIL:
      return {
        ...state,
        searchError: action.payload,
      };
    case ERROR_CREATING_POKEMON:
      return {
        ...state,
        createError: action.payload,
      };
    case ERROR_GETTIN_EM_ALL:
      return {
        ...state,
        gettingAllError: action.payload,
      };
    default:
      return state;
  }
};
