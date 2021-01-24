export enum cellType {
  empty = "empty",
  food = "food",
  snake = "snake",
}

export enum ArrowType {
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
}

export enum Direction {
  Top,
  Right,
  Down,
  Left,
}

export interface Cell {
  x: number;
  y: number;
  type: cellType;
}
