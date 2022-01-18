const { Board, Led, Motor } = require("johnny-five");
const processDatas = require("./processDatas/processDatas");
const PARAMS = require("./PARAMS");
const defineBandwidth = require("./processDatas/defineBandwidth");
const EPOCHS = require("./EPOCHS");
const { executionAsyncResource } = require("async_hooks");

processDatas.fetchDatas();

setInterval(() => {
  console.log(EPOCHS.size);
}, PARAMS.refresh.timer);

let vib1, vib2, vib3, vib4;
let vibs = [];

let tictic = true;

let P2_1 = {
  count: 0,
  beat: {
    power: 255,
    bpm: 10,
  },
  sin: {
    val: 0,
    power: {
      min: 30,
      max: 100,
    },
    speed: 120, // More it is slower it is
  },
  cos: {
    val: 0,

    power: {
      min: 0,
      max: 30,
    },
    speed: 20,
  },
};

const board = new Board();

board.on("ready", () => {
  // Create a standard `led` component
  // on a valid pwm pin

  // Normal Mode With differents intensity
  //v1();
  initMotors();
  //Music
  //v2();
  // Beat on Data Recieved and Sin Wave
  v2_1();

  // To Stop Programm
  //stopMotors();
});

const v2_1 = () => {
  // Sin
  setInterval(() => {
    P2_1.sin.val = Math.sin(P2_1.count / P2_1.sin.speed);
    P2_1.cos.val = Math.cos(P2_1.count / P2_1.cos.speed);

    P2_1.count++;
    v2_1Cos();
    v2_1Sin();
  }, 10);
  // Beat
  setInterval(() => {
    if (tictic) {
      tictic = false;
    } else {
      tictic = true;
    }
    v2_1Beat();
  }, PARAMS.refresh.timer / P2_1.beat.bpm);
};
const v2_1Beat = () => {
  if (tictic) {
    const data = map(EPOCHS.size, 0, 1000, 0, P2_1.beat.power);
    vib4.start(data);
  } else {
    vib4.start(0);
  }
};

const v2_1Cos = () => {
  const data = map(P2_1.cos.val, -1, 1, P2_1.cos.power.min, P2_1.cos.power.max);
  vib2.start(data);
};

const v2_1Sin = () => {
  const data = map(P2_1.sin.val, -1, 1, P2_1.sin.power.min, P2_1.sin.power.max);
  vib1.start(data);
};

const v2 = () => {
  setInterval(() => {
    if (tictic) {
      tictic = false;
    } else {
      tictic = true;
    }
    loopTicTic();
  }, PARAMS.refresh.timer / 10);
};

const v1 = () => {
  setInterval(() => {
    loopDifferentsMeasures();
  }, PARAMS.refresh.timer);
};

const stopMotors = () => {
  vib1.start(0);
  vib2.start(0);
  vib3.start(0);
  vib4.start(0);
};

const loopDifferentsMeasures = () => {
  const data1 = map(EPOCHS.size, 0, 1000, 0, 255);
  const data2 = map(EPOCHS.size, 0, 10000, 0, 255);
  const data3 = map(EPOCHS.size, 0, 200, 0, 255);
  const data4 = map(EPOCHS.size, 0, 500, 0, 255);

  vib1.start(data1);
  vib2.start(data2);
  vib3.start(data3);
  vib4.start(data4);
};

const loopTicTic = () => {
  console.log(tictic);
  vib1.start(50);
  vib2.start(155);
  if (tictic) {
    vib3.start(200);
    vib4.start(200);
  } else {
    vib3.start(50);
    vib4.start(50);
  }
};

const initMotors = () => {
  vib4 = new Motor(11);
  vib3 = new Motor(10);
  vib2 = new Motor(6);
  vib1 = new Motor(5);
  vibs = [vib1, vib2, vib3, vib4];
};

const map = (num, start1, stop1, start2, stop2) => {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
