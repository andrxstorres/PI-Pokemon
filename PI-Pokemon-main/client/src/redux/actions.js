import axios from "axios";
// import { GET_POKEMON_BY_NAME } from "./constants";

export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";

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

export const getDetailsById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
    console.log("esto es la action");
    dispatch({
      type: GET_DETAIL_BY_ID,
      payload: data,
    });
  };
};

export const getAllTypes = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/types`);
    console.log("esto es la action de types");
    dispatch({
      type: GET_ALL_TYPES,
      payload: data,
    });
  };
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    const { data } = await axios.post(`http://localhost:3001/pokemons`, pokemon);
    console.log("esto es la action de types");
    dispatch({
      type: CREATE_POKEMON,
      payload: data,
    });
  };
};
