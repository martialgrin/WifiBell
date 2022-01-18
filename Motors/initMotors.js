const { Board, Led, Motor } = require("johnny-five");
const PARAMS = require("../PARAMS");
const { map, lerp } = require("../Utils");

let vibs = [];

class Motors {
  constructor() {
    this.board = new Board();

    this.vib1;
    this.vib2;
    this.vib3;
    this.vib4;
    this.data2 = 0;
    this.isReady = false;
    this.tictic = false;
    this.LerpedEPOCHSize = 0;
    this.LASTEPOCH = {
      size: 0,
      nb: 0,
    };
    this.EPOCHS = this.LASTEPOCH;
    this.initBoard();
  }
  initBoard() {
    this.board.on("ready", () => {
      this.initMotors();
    });
  }
  initMotors() {
    this.vib4 = new Motor(11);
    this.vib3 = new Motor(10);
    this.vib2 = new Motor(6);
    this.vib1 = new Motor(5);
    this.AlwaysLoop(30, 255);
    this.isReady = true;
    this.draw();
  }

  draw() {
    // this.EPOCHS;
    this.LerpedEPOCHSize = lerp(this.LerpedEPOCHSize, this.EPOCHS.size, 0.1);
    this.data2 = map(this.LerpedEPOCHSize, 0, 1000, 0, 255);
    this.vib2.start(this.data2);

    setTimeout(() => {
      this.draw.bind(this);
    }, 100);
  }
  requestAnimationFrame(f) {
    setImmediate(() => f(Date.now()));
  }

  loop(EPOCHS) {
    console.log(EPOCHS);
    this.EPOCHS = EPOCHS;
    if (this.isReady) {
      // this.bpm();
      const data1 = map(EPOCHS.nb, 0, 20, 0, 255);
      const data2 = map(EPOCHS.size, 0, 200, 0, 255);
      const data4 = map(EPOCHS.size, 0, 500, 0, 255);
      this.vib2.start(data2);

      // this.vib2.start(data2);
      // this.vib3.start(data3);
      // this.vib4.start(data4);
      // this.LASTEPOCH = LerpedEPOCH;
    }
  }

  bpm() {
    setInterval(() => {
      if (this.tictic) {
        this.tictic = false;
      } else {
        this.tictic = true;
      }
    }, PARAMS.refresh.timer / PARAMS.beat.bpm);
  }

  AlwaysLoop(min, max) {
    if (this.tictic) {
      this.vib1.start(max);
    } else {
      this.vib1.start(0);
    }
  }
}

// const motors = () => {};

// const initMotors = () => {};

// const loopDifferentsMeasures = (EPOCHS) => {};

module.exports = {
  Motors: Motors,
};
