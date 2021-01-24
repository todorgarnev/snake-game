import React, { useCallback, useEffect, useRef, useState } from "react";
import { Cell, cellType, Direction, ArrowType } from "./models";
import { getCell, getField, isInField, updateField, isFoodEaten } from "./utils";
import useInterval from "./useInterval";
import "./App.css";

function App() {
  const [field, setField] = useState<Cell[]>(getField(25));
  const [food, setFood] = useState<Cell>(getCell(cellType.food));
  const [snakeHead, setSnakeHead] = useState<Cell>(getCell(cellType.snake));
  const [prevSnakeHead, setPrevSnakeHead] = useState<Cell>(snakeHead);
  const [snakeBody, setSnakeBody] = useState<Cell[]>([]);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [isGameOn, setIsGameOn] = useState<boolean>(true);
  let snakeInterval = useRef();

  const handleKeyPress = useCallback((event: KeyboardEvent): void => {
    switch (event.key) {
      case ArrowType.ArrowUp:
        setDirection(Direction.Top);
        break;
      case ArrowType.ArrowRight:
        setDirection(Direction.Right);
        break;
      case ArrowType.ArrowDown:
        setDirection(Direction.Down);
        break;
      case ArrowType.ArrowLeft:
        setDirection(Direction.Left);
        break;
      default:
        break;
    }

  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    setField(updateField(field, food, snakeHead));

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [handleKeyPress]);

  useInterval(() => {
      setPrevSnakeHead({
        x: snakeHead.x,
        y: snakeHead.y,
        type: cellType.empty
      });

      setSnakeHead((prevSnakeHead: Cell) => {
        switch (direction) {
          case Direction.Top:
            return {
              x: prevSnakeHead.x - 1,
              y: prevSnakeHead.y,
              type: prevSnakeHead.type
            };
          case Direction.Right:
            return {
              x: prevSnakeHead.x,
              y: prevSnakeHead.y + 1,
              type: prevSnakeHead.type
            };
          case Direction.Down:
            return {
              x: prevSnakeHead.x + 1,
              y: prevSnakeHead.y,
              type: prevSnakeHead.type
            };
          case Direction.Left:
            return {
              x: prevSnakeHead.x,
              y: prevSnakeHead.y - 1,
              type: prevSnakeHead.type
            };
          default:
            break;
        }
        return prevSnakeHead;
      });
  }, isGameOn ? 150 : null);

  useEffect(() => {
    if (isInField(snakeHead, field)) {
      if (isFoodEaten(snakeHead, food)) {
        setSnakeBody((prevSnakeBody: Cell[]) => [
          ...prevSnakeBody,
          {
            x: food.x,
            y: food.y,
            type: cellType.snake
          }
        ]);
        setFood(getCell(cellType.food));
      }
      setField(updateField(field, food, snakeHead, prevSnakeHead, ...snakeBody));
    } else {
      setIsGameOn(false);
    }
  }, [snakeHead]);

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
