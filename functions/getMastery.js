const { regionNames } = require("../src/util/constants.js");
const getRiotData = require("./utils/getRiotData.js");

exports.handler = async (event) => {
  const { summonerId, regionName } = JSON.parse(event.body);
  const regionCode = regionNames[regionName];
  const url = `https://${regionCode.toLowerCase()}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`;

  return await getRiotData(url);
};
