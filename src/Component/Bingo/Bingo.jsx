import React, { useState, useEffect, useRef } from "react";
import "./bingo.css";

function generateGrid() {
  const grid = [];
  const usedNumbers = new Set();

  for (let i = 0; i < 5; i++) {
    const row = [];
    const rowUsedNumbers = new Set();

    for (let j = 0; j < 5; j++) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 25) + 1;
      } while (usedNumbers.has(randomNumber) || rowUsedNumbers.has(randomNumber));
      rowUsedNumbers.add(randomNumber);
      usedNumbers.add(randomNumber);
      row.push(randomNumber);
    }

    grid.push(row);
  }

  return grid;
}


function checkWinner(grid) {
  let countX = 0;

  for (let i = 0; i < 5; i++) {

    
    for (let j = 0; j < 5; j++) {
      if (grid[i][j] === 'X') {
        countX++;
      }
    }
    if (countX === 16) {
      return true;
    }
  }

  
  for (let j = 0; j < 5; j++) {
    let countX = 0;
    for (let i = 0; i < 5; i++) {
      if (grid[i][j] === 'X') {
        countX++;
      }
    }
    if (countX === 16) {
      return true;
    }
  }

  // Check main diagonal (top-left to bottom-right)
  let countMainDiagonal = 0;
  for (let i = 0; i < 5; i++) {
    if (grid[i][i] === 'X') {
      countMainDiagonal++;
    }
  }
  if (countMainDiagonal === 16) {
    return true;
  }

  // Check secondary diagonal (top-right to bottom-left)
  let countSecondaryDiagonal = 0;
  for (let i = 0; i < 5; i++) {
    if (grid[i][4 - i] === 'X') {
      countSecondaryDiagonal++;
    }
  }
  if (countSecondaryDiagonal === 16) {
    return true;
  }

  return false;
}


function Grid(props) {
  const { grid, selectedNumber } = props;

  return (
    <div>
      <h2>{props.title}</h2>
      
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={cell === selectedNumber ? 'grid-cell selected' : 'grid-cell'}>
                {cell === selectedNumber ? 'X' : cell}
              </div>
            ))}
          </div>
        ))}
        
      </div>
    </div>
  );
}

function Bingo() {
  const [grid1, setGrid1] = useState(generateGrid());
  const [grid2, setGrid2] = useState(generateGrid());
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const inputRef = useRef(null);

  useEffect(() => {
    setGrid1(generateGrid());
    setGrid2(generateGrid());
  }, []);

  const handleSelectNumber = (number) => {
    if (inputRef.current.value === "" || inputRef.current.value > 25) {
      alert("Enter a number between 1-25");
    } else {
      const updatedGrid1 = grid1.map(row => row.map(cell => cell === number ? 'X' : cell));
      const updatedGrid2 = grid2.map(row => row.map(cell => cell === number ? 'X' : cell));
      setGrid1(updatedGrid1);
      setGrid2(updatedGrid2);
      setSelectedNumber();
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      inputRef.current.value = "";

      // Check for winner
      
      if (checkWinner(updatedGrid1)) {
        alert(`Player One wins!`);
      } else if (checkWinner(updatedGrid2)) {
        alert(`Player Two wins!`);
      }
    }
  };

  return (
    <div>
    <div className="app">
      <Grid title="Grid 1" grid={grid1} />
      <Grid title="Grid 2" grid={grid2} />
    </div>
<div className="app2">
<h3>Player {currentPlayer === 1 ? "One" : "Two"}'s Turn</h3>
      <input
        ref={inputRef}
        type="number"
        placeholder="Enter a number"
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
      />
      <button onClick={() => handleSelectNumber(selectedNumber)}>
        Select Number
      </button>
</div>
    </div>
  );
}

export default Bingo;
