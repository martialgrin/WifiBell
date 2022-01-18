newConnections = require("../processDatas/NewConnections");

const connectionsIPV6 = [];

module.exports = function IPV6Connection(packet) {
  const dhost = packet.payload.dhost.addr;
  const dhostLength = dhost.length;
  //   console.log(dhost[dhostLength - 1]);

  if (typeof dhostLength != 0) {
    const newsAddr = newConnections(dhost);
    if (typeof newsAddr != "undefined") {
      console.log(newsAddr);
      return newsAddr;
    }
  }
};
