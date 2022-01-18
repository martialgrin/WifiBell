const map = (num, start1, stop1, start2, stop2) => {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
const lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

module.exports = {
  map: map,
  lerp: lerp,
};
