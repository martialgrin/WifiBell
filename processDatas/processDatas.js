const PARAMS = require("../PARAMS");
const fs = require("fs");
const dBWidth = require("./defineBandwidth");

const fetchDatas = () => {
  let rawdata = fs.readFileSync("jsonFiles/" + PARAMS.file.url + ".json");
  const datas = JSON.parse(rawdata);
  calcDifferenceBetweenEpoch(datas);
};

const calcDifferenceBetweenEpoch = (datas) => {
  const array = [];
  for (let i = 1; i < datas.length; i++) {
    const difference =
      Math.floor(
        (datas[i].epoch - datas[i - 1].epoch) *
          (1000 * PARAMS.epochs.granularity)
      ) / PARAMS.epochs.granularity;
    const obj = {
      weight: datas[i].size,
      time: difference,
    };

    setTimeout(() => {
      dBWidth.defineBandwidth(obj.weight);
    }, obj.time);

    array.push(obj);
  }
};

exports.fetchDatas = fetchDatas;
