import React, { useCallback, useEffect, useState } from "react";
import { Cell, cellType, Direction, ArrowType } from "./models";
import {
  getCell,
  getField,
  isInField,
  updateField,
  isFoodEaten,
  moveSnake
} from "./utils";
import useInterval from "./useInterval";
import "./App.css";

function App() {
  const [field, setField] = useState<Cell[]>(getField(25));
  const [food, setFood] = useState<Cell>(getCell(cellType.food, 25));
  const [snake, setSnake] = useState<Cell[]>([getCell(cellType.snake, 25)]);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [speed, setSpeed] = useState<number>(300);
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
    setField(updateField(field, food, ...snake));

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (snake.length > 0 && isInField(snake[0], field)) {
      if (isFoodEaten(snake[0], food)) {
        setSpeed((prevSpeed: number) => {
          if (prevSpeed > 100) {
            return prevSpeed - 15
          } else {
            return prevSpeed;
          }
        });

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
    setSnake(moveSnake(snake, direction, field));
  }, isGameOn ? speed : null);

  const onButtonClick = (): void => {
    setIsGameOn(true);
    setSnake([getCell(cellType.snake, 25)]);
    setSpeed(300);
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
