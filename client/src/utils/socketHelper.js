import socketIOClient from "socket.io-client";
const endpoint = "http://localhost:5000";

export default socketIOClient(endpoint);
