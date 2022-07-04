const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

router.get("/", async (req, res) => {
  const pokeName = req.query.name;

  try {
    if (pokeName) {
      const dbPokemon = await Pokemon.findOne({ where: { name: pokeName } });
      if (dbPokemon) {
        return res.send(dbPokemon);
      } else {
        const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        return res.send(apiPokemon.data);
      }
      // dbPokemon
      //   ? res.send(dbPokemon)
      //   : res.send(findAPIPokemonByName(pokeName))
    } else {
      const apiPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const { results } = apiPokemons.data;

      const pokemonsToHome = [];

      for (let e of results) {
        const { name, url } = e;
        const { data } = await axios.get(url);
        const unfilteredTypes = data.types;

        const filteredTypes = [];
        unfilteredTypes.map((e) => {
          filteredTypes.push(e.type.name);
        });

        const image = data.sprites.other["official-artwork"].front_default;
        let pokeToHome = { name, types: filteredTypes, image };
        pokemonsToHome.push(pokeToHome);
      }

      res.send(pokemonsToHome);
    }
  } catch (err) {
    res.status(400).send({ message: `El Pokémon '${req.query.name}' no existe!`, err });
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

router.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, types } = req.body;

  try {
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (types) {
      //SIN VERIFICAR TIPOS
      types.forEach(async (e) => {
        const typeToAdd = await Type.findOne({ where: { name: e } });
        await newPokemon.addType(typeToAdd);
      });
      // PETICION
      // const { data } = await axios.get("http://localhost:3001/types");
      // const typesToSet = data.filter((e) => types.includes(e.name));
      // console.log(typesToSet);
      //TOMANDO LOS TIPOS DE LA DB
      // const AllTypesResponse = await Type.findAll();
      // const allTypes = [];
      // AllTypesResponse.forEach((e) => {
      //   const { id, name } = e.dataValues;
      //   allTypes.push({ id, name });
      // });
      // const typesToSet = data.filter((e) => allTypes.includes(e.name));
      // console.log(typesToSet);
    }

    res.status(201).send({ m: `Your new Pokémon '${name}' has been saved!` });
  } catch (err) {
    res.status(400).send({ m: `Something went wrong when creating '${req.body.name}'`, err });
  }
});

module.exports = router;
