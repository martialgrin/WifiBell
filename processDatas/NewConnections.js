const devicesConnected = [];

module.exports = function newConnections(addr) {
  if (
    devicesConnected.length === 0 ||
    !devicesConnected.includes(addr[addr.length - 1])
  ) {
    devicesConnected.push(addr[addr.length - 1]);

    return addr;
  }
};
