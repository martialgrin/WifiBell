const { Board, Led, Motor } = require("johnny-five");
const processDatas = require("./processDatas/processDatas");
const fs = require("fs");
const PARAMS = require("./PARAMS");
const defineBandwidth = require("./processDatas/defineBandwidth");
const EPOCHS = require("./EPOCHS");
const { executionAsyncResource } = require("async_hooks");
const { motors, loop, Motors } = require("./Motors/initMotors");
epochSession = require("./InputPCAP/epochSession");

// Add date for realtime elements
let EPOCH = {
  size: 0,
  nb: 0,
};
let LASTEPOCH = EPOCH;

function init() {
  let EPOCHS = 0;
  fs.readdir("session", function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    let path = files[files.length - 1].slice(3, 8);
    EPOCHS = path;
  });

  let motors = new Motors();
  setInterval(() => {
    const date = new Date();
    let startTime = getSrcName(date);
    function getPackets() {
      epochSession(function (session) {
        EPOCH.size = session.size - LASTEPOCH.size;
        EPOCH.nb = session.nb - LASTEPOCH.nb;
        motors.loop(EPOCH);
        LASTEPOCH.nb = session.nb;
        LASTEPOCH.size = session.size;
      });
    }
    getPackets();

    EPOCHS++;
    startTime++;
  }, 1000);
}

function getSrcName(date) {
  let sec = ("0" + date.getSeconds()).slice(-2);
  let min = date.getMinutes();
  // console.log(sec, min);
  if (sec == "60") {
    sec = "00";
    min = min + 1;
  }
  const h = date.getHours();
  const d = date.getDate();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const y = date.getFullYear();
  // console.log(y, m, d, h, min, sec);
  return `${y}${m}${d}${h}${min}${sec}`;
}

init();

// -sport = --source port
//-dport = = destination port
