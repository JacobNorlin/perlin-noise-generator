// UTIL
function getNonZeroRandomValue() {
  let r = Math.random();
  while (r === 0) {
    r = Math.random();
  }
  return r;
}

function randomBoxMuller() {
  let u = getNonZeroRandomValue();
  let v = getNonZeroRandomValue();

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// DISTRIBUTIONS

function sampleNormal(mean = 0, stdDev = 1) {
  return mean + stdDev * randomBoxMuller();
}

function samplePoisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1.0;

  do {
    k++;
    p *= randomBoxMuller();
  } while (p > L);

  return Math.min(k - 1, 1)
}

export const statistics = {
  sampleNormal,
  samplePoisson,
};
