const axios = require("./axiosHelper");
const transactions = require("./transactions");

const getOutputIndex = async (transHash, address) => {
  const { data } = await axios.get(`/transactions/${transHash}`);
  const output = data.outputs
    .map(
      (output, index) =>
        output.lockScript.substring(4) === address
          ? { ...output, index }
          : { ...output, index: -1 }
    )
    .filter(({ index }) => index !== -1);
  return output[0];
};

const createTransaction = (
  key,
  referencedOutput,
  balance,
  sendValue,
  sendAddress
) => {
  const keys = [];
  let bountyTransaction = {
    version: 1,
    inputs: [],
    outputs: []
  };
  referencedOutput.forEach(({ hash, index }) => {
    bountyTransaction.inputs.push({
      referencedOutputHash: hash,
      referencedOutputIndex: index,
      unlockScript: ""
    });
    keys.push(key);
  });

  const change = balance - sendValue;

  //Refund
  bountyTransaction.outputs.push({
    value: change,
    lockScript: "ADD " + key.address
  });

  bountyTransaction.outputs.push({
    value: sendValue,
    lockScript: "ADD " + sendAddress
  });
  transactions(bountyTransaction, keys);
  return bountyTransaction;
};

module.exports = { getOutputIndex, createTransaction };
