import { Cell, cellType } from "./models";

export const getField = (fieldSize: number): Cell[] => {
  const arr: Cell[] = [];

  for (let i = 0; i < fieldSize; i++) {
    for (let y = 0; y < fieldSize; y++) {
      arr.push({
        x: i,
        y: y,
        type: cellType.empty,
      });
    }
  }

  return arr;
};

export const getCell = (cellType: cellType): Cell => {
  return {
    x: Math.floor(Math.random() * Math.floor(24)),
    y: Math.floor(Math.random() * Math.floor(24)),
    type: cellType,
  };
};
