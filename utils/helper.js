const axios = require("./axiosHelper");
const transactions = require("./transactions");
const crypto = require("crypto");
const ursa = require("ursa");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const HASH_ALGORITHM = "sha256";

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

const getAddressFromPublicKey = publicKeyHex => {
  let hash = crypto.createHash(HASH_ALGORITHM);
  let publicKey = Buffer.from(publicKeyHex, "hex");
  hash.update(publicKey);
  return hash.digest().toString("hex");
};

const getUser = async string => {
  if (string.match(/^[0-9a-fA-F]{24}$/) && string !== "system") {
    const user = await User.findById(string);
    return user.email;
  }
  return string;
};

const getTransInfoWithUser = async transactions => {
  return await Promise.all(
    transactions.map(async trans => {
      const { from, to } = trans;
      trans.from = await getUser(from);
      trans.to = await getUser(to);
      return trans;
    })
  );
};

module.exports = {
  getOutputIndex,
  createTransaction,
  getAddressFromPublicKey,
  getUser,
  getTransInfoWithUser
};
