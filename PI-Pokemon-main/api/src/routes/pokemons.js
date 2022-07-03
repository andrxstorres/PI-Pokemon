const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Pokemon } = require("../db.js");

router.get("/", async (req, res) => {
  const pokeName = req.query.name;

  try {
    if (pokeName) {
      const dbPokemon = await Pokemon.findOne({ where: { name: pokeName } });
      // dbPokemon
      //   ? res.send(dbPokemon)
      //   : res.send(findAPIPokemonByName(pokeName))
      if (dbPokemon) res.send(dbPokemon);

      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
      res.send(data);
    }

    const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");
    res.send(pokemons.data);
  } catch (err) {
    res.status(400).send({ message: `No existe ese Pokémon!`, err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const isUUID = !Number(id);
  if (isUUID) {
    const dbPokemon = await Pokemon.findByPK(id);
    res.send(dbPokemon);
  } else {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    res.send(data);
  }
});

module.exports = router;
