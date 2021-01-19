import React, { useEffect, useState } from "react";
import "./App.css";

enum cellType {
  empty = "empty",
  target = "target",
  snake = "snake"
}
interface Cell {
  x: number;
  y: number;
  type: cellType;
}

function App() {
  const [field, setField] = useState<Cell[]>([]);
  const [prevSnakePosition, setPrevSnakePosition] = useState<Cell>({
    x: 12,
    y: 12,
    type: cellType.snake
  });
  const [snakePosition, setSnakePosition] = useState<Cell>({
    x: 12,
    y: 12,
    type: cellType.snake
  });

  useEffect(() => {
    const arr: Cell[] = [];

    for (let i = 0; i < 25; i++) {
      for (let y = 0; y < 25; y++) {
        let type: cellType = cellType.empty;
        let cell: Cell;

        if (i === 12 && y === 12) {
          type = cellType.snake
          setSnakePosition({
            x: i,
            y: y,
            type: type
          });
        }

        cell = {
          x: i,
          y: y,
          type: type
        };

        arr.push(cell);
      }
    }
    console.log(arr);
    setField(arr);
    document.addEventListener("keydown", handleKeyPress);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  useEffect(() => {
    const updatedField: Cell[] = [...field];
    const nextIndex: number = field.findIndex((cell: Cell) => cell.x === snakePosition.x && cell.y === snakePosition.y);
    const prevIndex: number = field.findIndex((cell: Cell) => cell.x === prevSnakePosition.x && cell.y === prevSnakePosition.y);

    if (nextIndex > -1) {
      updatedField[nextIndex] = {
        ...snakePosition
      };
      updatedField[prevIndex] = {
        ...prevSnakePosition,
        type: cellType.empty
      };
      setField(updatedField);
    } else {
      console.log("GAME OVER");
    }
  }, [snakePosition]);

  const handleKeyPress = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "ArrowUp":
        setSnakePosition((prevState: Cell) => {
          setPrevSnakePosition(prevState);
          return {
            x: prevState.x - 1,
            y: prevState.y,
            type: cellType.snake
          }
        });
        break;
      case "ArrowDown":
        setSnakePosition((prevState: Cell) => {
          setPrevSnakePosition(prevState);
          return {
            x: prevState.x + 1,
            y: prevState.y,
            type: cellType.snake
          }
        });
        break;
      case "ArrowRight":
        setSnakePosition((prevState: Cell) => {
          setPrevSnakePosition(prevState);
          return {
            x: prevState.x,
            y: prevState.y + 1,
            type: cellType.snake
          }
        });
        break;
      case "ArrowLeft":
        setSnakePosition((prevState: Cell) => {
          setPrevSnakePosition(prevState);
          return {
            x: prevState.x,
            y: prevState.y - 1,
            type: cellType.snake
          }
        });
        break;
      default:
        break;
    }
  };

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
