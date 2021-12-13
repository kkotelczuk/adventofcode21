const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/01/input.txt")).toString();
  const values = data.split("\n").map((v) => +v);
  solution(values);
})();

const solution = (input) => {
  let prevValue = input[0];
  let count = 0;
  for (let i in input) {
    if (prevValue < input[i]) {
      count++;
    }
    prevValue = input[i];
  }
  console.log("count", count);
};
