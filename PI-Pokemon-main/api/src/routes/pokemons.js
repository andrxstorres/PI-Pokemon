const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

router.get("/", async (req, res) => {
  //SI RECIBE NOMBRE POR QUERY
  const pokeName = req.query.name;

  try {
    //VERIFICACION DEL NOMBRE POR QUERY
    if (pokeName) {
      const dbPokemon = await Pokemon.findOne({ where: { name: pokeName } });
      //VERIFICACION SI ES QUE ES UN POKEMON EN LA DB
      if (dbPokemon) {
        //SE GENERA El ARRAY DE TIPOS A PARTIR DE LA TABLA INTERMEDIA pokemon_types
        const dbPokemonTypes = await dbPokemon.getTypes();
        const types = [];
        dbPokemonTypes.forEach((e) => {
          types.push(e.name);
        });

        return res.send({ ...dbPokemon.dataValues, types });
      } else {
        //SI NO EXISTE EN DB, PROCEDEMOS A BUSCARLO EN LA API
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        //EXTRAEMOS TODOS LOS DATOS
        const { height, id, name, weight } = data;
        const image = data.sprites.other["official-artwork"].front_default;

        const types = [];
        data.types.map((e) => {
          types.push(e.type.name);
        });
        //GENERAMOS UN OBJETO STATS CON K:V = STAT: VALOR
        const stats = {};
        data.stats.forEach((e) => {
          if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
            stats[e.stat.name] = e.base_stat;
          }
        });

        const apiPokemonDetails = { id, name, image, types, stats, height, weight };
        return res.send(apiPokemonDetails);
      }
      //SI NO RECIBIMOS NOMBRE POR QUERY, DEVOLVEMOS TODOS LOS POKEMONS
    } else {
      const apiPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
      const { results } = apiPokemons.data;
      // const moreApiPokemons = await axios.get(next);
      // const secondRequest = moreApiPokemons.data.results;
      //DATA DE AXIOS GUARDA TODOS LOS POKEMONS EN OBJETOS DENTRO DE RESULTS
      //CADA OBJETO TIENE NOMBRE DEL POKEMON Y URL HACIA SUS DETALLES

      const pokemonsToHome = [];
      const promiseArray = results.map((e) => axios.get(e.url));
      Promise.all(promiseArray)
        .then((pokemonToFilter) => {
          pokemonToFilter.forEach(({ data }) => {
            const { name, height, id, weight } = data;

            const types = [];
            data.types.map((e) => {
              types.push(e.type.name);
            });

            const stats = {};
            data.stats.forEach((e) => {
              if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
                stats[e.stat.name] = e.base_stat;
              }
            });

            const image = data.sprites.other["official-artwork"].front_default;
            let pokeToHome = { id, name, image, types, stats, height, weight };
            pokemonsToHome.push(pokeToHome);
          });
          res.send(pokemonsToHome);
        })
        .catch((err) => {
          res.status(400).send({ m: "Ocurrió un error en la petición de la ruta /pokemons!", err });
        });
      //CREAMOS UN ARRAY PARA HACER UNA SUB-QUERY POR CADA POKEMON DENTRO DE UN FOR OF
      // for (let e of results) {
      //   //A DIFERENCIA DE LAS VECES ANTERIORES, TOMAMOS EL NAME DEL OBJETO DE DATA.RESULTS
      //   const { name, url } = e;
      //   const { data } = await axios.get(url);
      //   const { height, id, weight } = data;

      //   const types = [];
      //   data.types.map((e) => {
      //     types.push(e.type.name);
      //   });

      //   const stats = {};
      //   data.stats.forEach((e) => {
      //     if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
      //       stats[e.stat.name] = e.base_stat;
      //     }
      //   });
      //   // const stats = [];
      //   // data.stats.forEach((e) => {
      //   //   if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
      //   //     stats.push({ [e.stat.name]: e.base_stat });
      //   //   }
      //   // });

      //   const image = data.sprites.other["official-artwork"].front_default;
      //   let pokeToHome = { id, name, image, types, stats, height, weight };
      //   pokemonsToHome.push(pokeToHome);
      // }

      // for (let e of secondRequest) {
      //   //A DIFERENCIA DE LAS VECES ANTERIORES, TOMAMOS EL NAME DEL OBJETO DE DATA.RESULTS
      //   const { name, url } = e;
      //   const { data } = await axios.get(url);
      //   const { height, id, weight } = data;

      //   const types = [];
      //   data.types.map((e) => {
      //     types.push(e.type.name);
      //   });

      //   const stats = {};
      //   data.stats.forEach((e) => {
      //     if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
      //       stats[e.stat.name] = e.base_stat;
      //     }
      //   });
      //   // const stats = [];
      //   // data.stats.forEach((e) => {
      //   //   if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
      //   //     stats.push({ [e.stat.name]: e.base_stat });
      //   //   }
      //   // });

      //   const image = data.sprites.other["official-artwork"].front_default;
      //   let pokeToHome = { id, name, image, types, stats, height, weight };
      //   pokemonsToHome.push(pokeToHome);
      // }
    }
  } catch (err) {
    res.status(400).send({ message: `Ocurrió un error en la petición de la ruta /pokemons! Es posible que '${req.query.name}' no sea un Pokémon existente!`, err });
  }
});

router.get("/:id", async (req, res) => {
  const paramsId = req.params.id;
  const isUUID = !Number(paramsId);
  if (isUUID) {
    const dbPokemon = await Pokemon.findByPk(paramsId);
    res.send(dbPokemon);
  } else {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${paramsId}/`);
    const { height, id, name, weight } = data;

    const image = data.sprites.other["official-artwork"].front_default;

    const types = [];
    data.types.forEach((e) => {
      types.push(e.type.name);
    });

    const stats = {};
    data.stats.forEach((e) => {
      if (e.stat.name !== "special-attack" && e.stat.name !== "special-defense") {
        stats[e.stat.name] = e.base_stat;
      }
    });

    const pokeDetailById = { id, name, image, types, stats, height, weight };
    res.send(pokeDetailById);
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
      types.forEach(async (e) => {
        const typeToAdd = await Type.findOne({ where: { name: e } });
        await newPokemon.addType(typeToAdd);
      });
    }

    res.status(201).send({ m: `Your new Pokémon '${name}' has been saved!` });
  } catch (err) {
    res.status(400).send({ m: `Something went wrong when creating '${req.body.name}'`, err });
  }
});

module.exports = router;
