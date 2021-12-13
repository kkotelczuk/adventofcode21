const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/01/input.txt")).toString();
  const values = data.split("\n").map((v) => +v);
  const result = slidingWindow(values);
  console.log(result);
})();

const basic = (input) => {
  let prevValue = input[0];
  let count = 0;
  for (let i in input) {
    if (prevValue < input[i]) {
      count++;
    }
    prevValue = input[i];
  }
  return count;
};

const slidingWindow = (input) => {
  let windowA = input[0] + input[1] + input[2];
  let result = 0;
  for (let i in input) {
    if (+i + 2 > input.length) return result;
    let windowB = input[i] + input[+i + 1] + input[+i + 2];
    if (windowB > windowA) {
      result++;
    }
    windowA = windowB;
  }
};
