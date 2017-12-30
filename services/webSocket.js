const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");

wss.on("open", () => {
  console.log("OPEN SOCKET");
  setInterval(() => {
    wss.send("something");
  }, 40000);
});

wss.on("message", data => {
  console.log("WEB SOCKET", data);
});
