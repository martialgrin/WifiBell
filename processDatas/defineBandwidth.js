const EPOCHS = require("../EPOCHS");
const PARAMS = require("../PARAMS");

let sizeBySec = 0;
let lastSizBySec = 0;

const defineBandwidth = (data) => {
  sizeBySec = sizeBySec + Number(data);
  EPOCHS.size = sizeBySec;
};

setInterval(() => {
  console.log("Restart Timer");
  if (PARAMS.refresh.remove != 0) {
    sizeBySec = sizeBySec - PARAMS.refresh.remove;
  } else {
    if (lastSizBySec == sizeBySec) {
      EPOCHS.size = 0;
    }
    lastSizBySec = sizeBySec;
    sizeBySec = 0;
  }
}, PARAMS.refresh.timer);

module.exports = {
  defineBandwidth: defineBandwidth,
};
