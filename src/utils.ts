import { Cell, cellType, Direction } from "./models";

export const getField = (fieldSize: number): Cell[] => {
  const arr: Cell[] = [];

  // maybe update with for in
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

export const getCell = (cellType: cellType, fieldSize: number): Cell => ({
  x: Math.floor(Math.random() * Math.floor(fieldSize - 1)),
  y: Math.floor(Math.random() * Math.floor(fieldSize - 1)),
    type: cellType,
});

export const updateField = (field: Cell[], ...cells: Cell[]): Cell[] => {
  const updatedField: Cell[] = [...field];

  updatedField.forEach((fieldCell: Cell) => {
    const matchedCell: Cell | undefined = cells.find((cell: Cell) => fieldCell.x === cell.x && fieldCell.y === cell.y);

    if (matchedCell) {
      fieldCell.x = matchedCell.x;
      fieldCell.y = matchedCell.y;
      fieldCell.type = matchedCell.type;
    } else if (fieldCell.type === cellType.snake) {
      fieldCell.type = cellType.empty;
    }
  });

  return updatedField;
};

export const isInField = (cell: Cell, field: Cell[]): boolean => field.some((fieldCell: Cell) => fieldCell.x === cell.x && fieldCell.y === cell.y);

export const isFoodEaten = (snakeHead: Cell, food: Cell): boolean => snakeHead.x === food.x && snakeHead.y === food.y;

export const moveSnake = (snake: Cell[], direction: Direction): Cell[] => {
  return snake.map((cell: Cell, index) => {
    let updatedCell: Cell = cell;

    if (index === 0) {
      switch (direction) {
        case Direction.Top:
          return {
            x: updatedCell.x - 1,
            y: updatedCell.y,
            type: updatedCell.type
          }
        case Direction.Right:
          return {
            x: updatedCell.x,
            y: updatedCell.y + 1,
            type: updatedCell.type
          }
        case Direction.Down:
          return {
            x: updatedCell.x + 1,
            y: updatedCell.y,
            type: updatedCell.type
          }
        case Direction.Left:
          return {
            x: updatedCell.x,
            y: updatedCell.y - 1,
            type: updatedCell.type
          }
        default:
          return updatedCell
      }
    }

    return snake[index - 1];
  });
}