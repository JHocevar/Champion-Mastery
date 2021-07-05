const axios = require("axios");
const { riotHeaders } = require("../../src/util/constants.js");

module.exports = async (url) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: url,
      headers: riotHeaders,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Error calling RIOT API" };
  }
};
