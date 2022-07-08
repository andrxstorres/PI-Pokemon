import axios from "axios";
// import { GET_POKEMON_BY_NAME } from "./constants";

export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const ERROR_GETTING_DETAIL = "ERROR_GETTING_DETAIL";
export const ERROR_SEARCHING_BY_ID = "ERROR_SEARCHING_BY_ID";
export const ERROR_CREATING_POKEMON = "ERROR_CREATING_POKEMON";
export const ERROR_GETTIN_EM_ALL = "ERROR_GETTIN_EM_ALL";

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_GETTING_DETAIL,
        payload: err.response.status,
      });
    }
  };
};

export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      console.log("getAll hizo la petición a la ruta /pokemons");
      const { data } = await axios.get(`http://localhost:3001/pokemons`);
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: data,
      });
    } catch (err) {
      console.log("falló la petición a la ruta /pokemons");
      dispatch({
        type: ERROR_GETTIN_EM_ALL,
        payload: err.response.status,
      });
    }
  };
};

export const getDetailsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
      console.log(data);
      dispatch({
        type: GET_DETAIL_BY_ID,
        payload: data,
      });
    } catch (err) {
      console.log("falla el axios de detail by id", err);
      dispatch({
        type: ERROR_SEARCHING_BY_ID,
        payload: err,
      });
    }
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
    try {
      const { data } = await axios.post(`http://localhost:3001/pokemons`, pokemon);
      console.log("esto es la action generator de create");
      dispatch({
        type: CREATE_POKEMON,
        payload: data,
      });
    } catch (err) {
      console.log("falla el axios de create", err);
      dispatch({
        type: ERROR_CREATING_POKEMON,
        payload: err,
      });
    }
  };
};
