const fs = require("fs").promises;

(async () => {
  const data = (await fs.readFile("../data/04/input.txt")).toString();
  const values = data.split("\n\n");
  const result = basicBingo(values);
  console.log("result", result);
})();

const basicBingo = (input) => {
  const randomNumbers = input
    .splice(0, 1)[0]
    .split(",")
    .map((v) => +v);
  const boards = input
    .map((item) => item.split("\n"))
    .map((b) =>
      b.map((i) =>
        i
          .trim()
          .split(" ")
          .filter((i) => i != "")
          .map((v) => +v)
      )
    );
  for (number of randomNumbers) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      board.forEach((row) => {
        const i = row.indexOf(number);
        if (i >= 0) {
          row[i] = undefined;
        }
      });
      const isBingo = checkBoard(board);
      if (isBingo == true) {
        const boardScore = board.reduce((acc, r) => {
          acc += r.reduce((acc, v) => {
            if (v !== undefined) acc += v;
            return acc;
          }, 0);
          return acc;
        }, 0);
        if (boards.length > 1) {
          boards.splice(i--, 1);
        } else {
          return number * boardScore;
        }
      }
    }
  }
};

const checkBoard = (board) => {
  let undefinedColumnsIndexes = [];
  const boardSize = board.length;
  let isBingo = false;
  for (row of board) {
    // check row
    isBingo = row.every((i) => i === undefined);
    if (isBingo) return true;
    // check columns
    if (undefinedColumnsIndexes.length === 0) {
      undefinedColumnsIndexes = row.reduce((acc, r, i) => {
        if (r === undefined) acc.push([i, 1]);
        return acc;
      }, []);
    } else {
      for (let i = 0; i < undefinedColumnsIndexes.length; i++) {
        if (row[undefinedColumnsIndexes[i][0]] === undefined) {
          undefinedColumnsIndexes[i][1]++;
        }
        if (undefinedColumnsIndexes[i][1] === boardSize) {
          return true;
        }
      }
    }
  }
  return false;
};
