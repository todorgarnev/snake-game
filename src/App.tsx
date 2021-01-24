import React, { useEffect, useState } from "react";
import { ArrowType, Cell, cellType } from "./models";
import { getCell, getField, } from "./utils";
import "./App.css";

function App() {
  const [field, setField] = useState<Cell[]>(getField(25));
  const [food, setFood] = useState<Cell>(getCell(cellType.food));
  const [snakeHead, setSnakeHead] = useState<Cell>(getCell(cellType.snake));
  const [snakeBody, setSnakeBody] = useState<Cell[]>([]);


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    console.log("field >>", field);
    console.log("food >>", food);
    console.log("snakeHead >>", snakeHead);


    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (
      event.key === ArrowType.ArrowUp ||
      event.key === ArrowType.ArrowRight ||
      event.key === ArrowType.ArrowDown ||
      event.key === ArrowType.ArrowLeft
    ) {
      console.log("event >>", event);
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
