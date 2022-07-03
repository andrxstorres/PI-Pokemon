const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Type } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const dbAllTypesResponse = await Type.findAll();

    // if (dbAllTypesResponse) {
    const allTypes = [];
    dbAllTypesResponse.forEach((e) => {
      const { typeId, name } = e.dataValues;
      allTypes.push({ typeId, name });
    });
    // }
    res.send(allTypes);
  } catch (err) {
    res.status(404).send({ m: "Something went wrong when searching for Pokémon types stored on DB", err });
  }
});

module.exports = router;
