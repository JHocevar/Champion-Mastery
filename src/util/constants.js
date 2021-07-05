const regionNames = {
  BR: "BR1",
  EUN: "EUN1",
  EUW: "EUW1",
  JP: "JP1",
  KR: "KR",
  LA1: "LA1",
  LA2: "LA2",
  NA: "NA1",
  OC: "OC1",
  TR: "TR1",
  RU: "RU",
};

const riotHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "Origin": "https://developer.riotgames.com",
  "X-Riot-Token": process.env.GATSBY_RIOT_API_KEY,
};

module.exports = {
  regionNames,
  riotHeaders,
};
