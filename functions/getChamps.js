const getRiotData = require("./utils/getRiotData.js");
const { regionNames } = require("../src/util/constants.js");

exports.handler = async (event) => {
  const url = `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/en_US/champion.json`;

  return await getRiotData(url);
};
