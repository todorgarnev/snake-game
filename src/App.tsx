import React, { useEffect, useState } from 'react';
import './App.css';

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
  const [field, setField] = useState<Cell[]> ([]);

  useEffect(() => {
    const arr: Cell[] = [];

    for (let i = 0; i < 25; i++) {
      for (let y = 0; y < 25; y++) {
        let type: cellType = cellType.empty
        let cell: Cell;

        if (i === 12 && y === 12) {
          cell = {
            x: i,
            y: y,
            type: type
          };
        }

        arr.push(cell);
      }
    }
    setField(arr);
  }, []);

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
