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

export const getCell = (cellType: cellType): Cell => ({
    x: Math.floor(Math.random() * Math.floor(24)),
    y: Math.floor(Math.random() * Math.floor(24)),
    type: cellType,
});

export const updateField = (field: Cell[], ...cells: Cell[]): Cell[] => {
  const updatedField: Cell[] = [...field];

  cells.forEach((cell: Cell) => {
    const matchedFieldCell: number = field.findIndex((fieldCell: Cell) => fieldCell.x === cell.x && fieldCell.y === cell.y);

    if (matchedFieldCell >= 0) {
      updatedField[matchedFieldCell] = {
        x: cell.x,
        y: cell.y,
        type: cell.type
      };
    }
  });

  return updatedField;
};

export const isInField = (cell: Cell, field: Cell[]): boolean => field.some((fieldCell: Cell) => fieldCell.x === cell.x && fieldCell.y === cell.y);

export const isFoodEaten = (snakeHead: Cell, food: Cell): boolean => snakeHead.x === food.x && snakeHead.y === food.y;