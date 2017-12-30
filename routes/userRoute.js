const axios = require("../utils/axiosHelper");

module.exports = app => {
  app.get("/balance", async (req, res) => {
    const { data } = await axios.get("/blocks?order=-1");
    const transactions = data.map(({ transactions }) => transactions[0]);
    const outputs = transactions.map(({ outputs }) => outputs);
    res.send(outputs);
  });
};
