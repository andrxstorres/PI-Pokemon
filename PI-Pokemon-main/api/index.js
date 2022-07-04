//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require("axios");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Type } = require("./src/db.js");

// Syncing all the models at once.

const force = { force: true };

conn.sync(force).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });

  if (force.force) {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    const types = data.results;
    let id = 0;
    for (let e of types) {
      id++;
      await Type.create({ id: id, name: e.name });
    }
    console.log("Database loaded!");
  }
});
