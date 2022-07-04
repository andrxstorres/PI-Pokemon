const { default: axios } = require("axios");

// let id = 1154;

module.exports = {
  findAPIPokemonByName: async (name) => {
    return ({ data } = await axios.get(`http://localhost:3001/pokemons?name=${name}`));
  },
  // generatePokeId: async () => {
  //   return (id = id + 1);
  // },
};
