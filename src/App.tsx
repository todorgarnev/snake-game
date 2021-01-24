import React, { useCallback, useEffect, useState } from "react";
import { Cell, cellType, Direction, ArrowType } from "./models";
import { getCell, getField, isInField, updateField, isFoodEaten, moveSnake } from "./utils";
import useInterval from "./useInterval";
import "./App.css";

function App() {
  const [field, setField] = useState<Cell[]>(getField(25));
  const [food, setFood] = useState<Cell>(getCell(cellType.food));
  const [snakeHead, setSnakeHead] = useState<Cell[]>([getCell(cellType.snake)]);
  const [prevSnakeHead, setPrevSnakeHead] = useState<Cell>(snakeHead[0]);
  // const [snakeBody, setSnakeBody] = useState<Cell[]>([]);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [isGameOn, setIsGameOn] = useState<boolean>(true);

  const handleKeyPress = useCallback((event: KeyboardEvent): void => {
    switch (event.key) {
      case ArrowType.ArrowUp:
        if (direction !== Direction.Down) {
          setDirection(Direction.Top);
        }
        break;
      case ArrowType.ArrowRight:
        if (direction !== Direction.Left) {
          setDirection(Direction.Right);
        }
        break;
      case ArrowType.ArrowDown:
        if (direction !== Direction.Top) {
          setDirection(Direction.Down);
        }
        break;
      case ArrowType.ArrowLeft:
        if (direction !== Direction.Right) {
          setDirection(Direction.Left);
        }
        break;
      default:
        break;
    }

  }, [direction]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    setField(updateField(field, food, snakeHead[0]));

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [handleKeyPress]);

  useEffect(() => {
    if (isInField(snakeHead[0], field)) {
      if (isFoodEaten(snakeHead[0], food)) {
        setSnakeHead((prevSnakeHead: Cell[]) => [
          ...prevSnakeHead,
          {
            x: food.x,
            y: food.y,
            type: cellType.snake
          }
        ]);
        setFood(getCell(cellType.food));
      }
      setField(updateField(field, food, prevSnakeHead, ...snakeHead));
    } else {
      setIsGameOn(false);
    }
  }, [snakeHead]);

  useInterval(() => {
    setSnakeHead(moveSnake(snakeHead, direction));
    setPrevSnakeHead({
      x: snakeHead[snakeHead.length - 1].x,
      y: snakeHead[snakeHead.length - 1].y,
      type: cellType.empty
    });
}, isGameOn ? 150 : null);

  return (
    <div className="app">
      <h1>Snake game</h1>

      <div className="field">
        {field.map((cell: Cell, index: number) => <div className={`cell ${cell.type}`} key={index}></div>)}
      </div>
    </div>
  );
}

export default App;
