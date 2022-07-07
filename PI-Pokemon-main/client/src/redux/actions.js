import axios from "axios";
// import { GET_POKEMON_BY_NAME } from "./constants";

export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    dispatch({
      type: GET_POKEMON_BY_NAME,
      payload: response.data,
    });
  };
};

export const getAllPokemons = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/pokemons`);
    dispatch({
      type: GET_ALL_POKEMONS,
      payload: data,
    });
  };
};