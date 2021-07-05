const getRiotData = require("./utils/getRiotData.js");
const { regionNames } = require("../src/util/constants.js");

exports.handler = async (event) => {
  const { summonerName, regionName } = JSON.parse(event.body);
  const regionCode = regionNames[regionName];
  const url = `https://${regionCode.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

  return await getRiotData(url);
};
