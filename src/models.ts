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

export interface Cell {
  x: number;
  y: number;
  type: cellType;
}
