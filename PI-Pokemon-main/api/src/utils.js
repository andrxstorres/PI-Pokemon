const { default: axios } = require("axios");

module.exports = {
  getAPIPokemonByName: async (pokeName) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons?name=${pokeName}`);

      const { height, id, name, weight } = data;

      const image = data.sprites.other["official-artwork"].front_default;

      const types = [];
      data.types.forEach((e) => {
        types.push(e.type.name);
      });

      const stats = {};
      data.stats.forEach((e) => {
        // let newStat = {e.name: }
        if (e.stat.name !== "special-attack" || e.stat.name !== "special-defense") stats = { ...stats, [e.stat.name]: e.base_stat };
      });

      return { image, name, types, stats, height, weight, id };
    } catch (err) {
      return { m: `Something went wrong while searching for '${pokeName}'` };
    }
  },
  // generatePokeId: async () => {
  //   return (id = id + 1);
  // },
  // getPokemonById: async (id) => {
  //   const isId = Number(id);
  //   if (id) {
  //     const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  //     const { height, name, weight } = data;
  //     console.log(data);
  //     res.send(data);
  //   } else {
  //   }

  //   pokemonToSend = {
  //     image,
  //     name,
  //     types,
  //     hp,
  //     attack,
  //     defense,
  //     speed,
  //     height,
  //     weight,
  //     id,
  //   };
  // },
};
