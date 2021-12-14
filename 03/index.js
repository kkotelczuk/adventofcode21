const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/03/input.txt")).toString();
  const values = data.split("\n");
  const result = basic(values);
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
