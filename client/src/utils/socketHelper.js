import socketIOClient from "socket.io-client";
const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://kcoin-wallet.herokuapp.com"
    : "http://localhost:5000";

export default socketIOClient(endpoint);
