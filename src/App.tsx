import React, { useCallback, useEffect, useState } from "react";
import { Cell, cellType, Direction, ArrowType } from "./models";
import { getCell, getField, isInField, updateField, isFoodEaten, moveSnake } from "./utils";
import useInterval from "./useInterval";
import "./App.css";

function App() {
  const [field, setField] = useState<Cell[]>(getField(25));
  const [food, setFood] = useState<Cell>(getCell(cellType.food, 25));
  const [snake, setSnake] = useState<Cell[]>([getCell(cellType.snake, 25)]);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [speed, setSpeed] = useState<number>(500);
  const [isGameOn, setIsGameOn] = useState<boolean>(true);

  // add a check if food and snake are not in the same spot
  // add result counter

  const handleKeyPress = useCallback((event: KeyboardEvent): void => {
    switch (event.key) {
      case ArrowType.ArrowUp:
        if (direction !== Direction.Down && direction !== Direction.Top) {
          setDirection(Direction.Top);
        }
        break;
      case ArrowType.ArrowRight:
        if (direction !== Direction.Left && direction !== Direction.Right) {
          setDirection(Direction.Right);
        }
        break;
      case ArrowType.ArrowDown:
        if (direction !== Direction.Top && direction !== Direction.Down) {
          setDirection(Direction.Down);
        }
        break;
      case ArrowType.ArrowLeft:
        if (direction !== Direction.Right && direction !== Direction.Left) {
          setDirection(Direction.Left);
        }
        break;
      default:
        break;
    }

  }, [direction]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    setField(updateField(field, food, ...snake));

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isInField(snake[0], field)) {
      if (isFoodEaten(snake[0], food)) {
        setSnake((snake: Cell[]) => [
          ...snake,
          {
            x: food.x,
            y: food.y,
            type: cellType.snake
          }
        ]);
        setFood(getCell(cellType.food, 25));
      }
      setField(updateField(field, food, ...snake));
    } else {
      setIsGameOn(false);
    }
  }, [snake]);

  useInterval(() => {
    setSnake(moveSnake(snake, direction));
  }, isGameOn ? speed : null);

  const onButtonClick = (): void => {
    setIsGameOn(true);
    setSnake([getCell(cellType.snake, 25)]);
  };

  return (
    <div className="app">
      <h1>Snake game</h1>

      <div className="field">
        {field.map((cell: Cell, index: number) => <div className={`cell ${cell.type}`} key={index}></div>)}
      </div>

      {
        !isGameOn &&
        <>
          <button className="start-game" onClick={() => onButtonClick()}>Start</button>
          <div className="game-over">game over</div>
        </>
      }


    </div>
  );
}

export default App;
