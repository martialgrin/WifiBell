newConnections = require("../processDatas/NewConnections");

module.exports = function IPV4Connection(packet) {
  if (typeof packet.payload.payload.saddr != "undefined") {
    const dAddr = packet.payload.payload.saddr.addr;

    if (dAddr.length == 4 && dAddr[0] == 192) {
      const newAddr = newConnections(dAddr);
      if (typeof newAddr != "undefined") {
        console.log(newAddr);
        return newAddr;
      }
    }
  }
};
