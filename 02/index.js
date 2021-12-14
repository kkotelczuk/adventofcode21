const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/02/input.txt")).toString();
  const values = data.split("\n");
  const result = advancePosition(values);
  console.log(result);
})();

const basicPosition = (input) => {
  let depth = 0;
  let horizontal = 0;
  input.forEach((value) => {
    const [direction, position] = value.split(" ");
    switch (direction) {
      case "forward":
        horizontal += +position;
        break;
      case "up":
        depth -= +position;
        break;
      case "down":
        depth += +position;
        break;
    }
  });
  return depth * horizontal;
};

const advancePosition = (input) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;
  input.forEach((value) => {
    const [direction, unit] = value.split(" ");
    switch (direction) {
      case "forward":
        horizontal += +unit;
        depth += aim * +unit;
        break;
      case "up":
        aim -= +unit;
        break;
      case "down":
        aim += +unit;
        break;
    }
  });
  return depth * horizontal;
};
