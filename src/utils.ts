import { Cell, cellType, Direction } from "./models";

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