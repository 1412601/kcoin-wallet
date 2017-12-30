const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.kcoin.club"
});

module.exports = axiosInstance;
