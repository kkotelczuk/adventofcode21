const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/03/input.txt")).toString();
  const values = data.split("\n");
  const result = lifeSupportRating(values);
  console.log("result", result);
})();

const basic = (input) => {
  const numberOfColumns = input[0].length;
  let tmpZeros = 0;
  let tmpOnes = 0;
  let gammaRate = "";
  let epsilonRate = "";
  for (let i = 0; i < numberOfColumns; i++) {
    input.forEach((v) => {
      +v[i] === 0 ? tmpZeros++ : tmpOnes++;
    });
    if (tmpZeros > tmpOnes) {
      gammaRate += "0";
      epsilonRate += "1";
    } else {
      gammaRate += "1";
      epsilonRate += "0";
    }
    tmpZeros = 0;
    tmpOnes = 0;
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const lifeSupportRating = (input) => {
  const oxygen = gatherer(input, 0, "oxygen");
  const co2 = gatherer(input, 0, "co2");
  return oxygen * co2;
};

const gatherer = (data, position, type) => {
  let tmpZeros = 0;
  let tmpOnes = 0;
  data.forEach((v) => {
    +v[position] === 0 ? tmpZeros++ : tmpOnes++;
  });
  let importantBit = null;
  if (tmpZeros === tmpOnes) {
    importantBit = type === "co2" ? 0 : 1;
  } else {
    const compareFunction = mathHelper[type];
    importantBit = compareFunction(tmpZeros, tmpOnes) ? 0 : 1;
  }
  const filteredData = data.filter((v) => +v[position] === importantBit);
  if (filteredData.length === 1) return parseInt(filteredData[0], 2);
  return gatherer(filteredData, position + 1, type);
};

const mathHelper = {
  co2: (a, b) => a < b,
  oxygen: (a, b) => a > b,
};
