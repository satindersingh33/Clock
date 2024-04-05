import React, { useState, useEffect, useRef } from "react";
import "./bingo.css";
import BackIcon from "../BackIcon";
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
  const [selectedNumber, setSelectedNumber] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [lineThrough, setLineThrough] = useState("B I N G O");
  const [secLineThrough, setSecLineThrough] = useState("B I N G O");
  const [winner, setWinner] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setGrid1(generateGrid());
    setGrid2(generateGrid());
  }, []);

  // Check winner function
  function checkWinner(grid) {
    const isBingo = (line) => {
      let countX = 0;
      line && line.forEach((index) => {
        const row = Math.floor(index / 5);
        const column = index % 5;
        if (grid[row][column] === '❌') {
          countX++;
        }
      });
      return countX === 5;
    };
    
    const rows = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24]
    ];
    const columns = [
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24]
    ];
    const diagonals = [
      [0, 6, 12, 18, 24], // Top-left to bottom-right
      [4, 8, 12, 16, 20]   // Top-right to bottom-left
    ];
  
    let completedLines = 0;
  
    rows.concat(columns, diagonals).forEach(line => {
      if (isBingo(line)) {
        completedLines++;
      }
    });

    if (completedLines >= 1) {
      setLineThrough("✔️ I N G O");
    }
    if (completedLines >= 2) {
      setLineThrough("✔️ ✔️N G O");
    }
    if (completedLines >= 3) {
      setLineThrough("✔️ ✔️ ✔️ G O");
    }
    if (completedLines >= 4) {
      setLineThrough("✔️ ✔️ ✔️ ✔️ O");
    }
    if (completedLines === 5) {
      setLineThrough("✔️ ✔️ ✔️ ✔️ ✔️");
      setWinner(currentPlayer === 1 ? "Player One" : "Player Two");
      alert(`${currentPlayer === 1 ? "Player One" : "Player Two"} wins!`);
    }
  }

  const handleSelectNumber = (number) => {
    const selectedNum = parseInt(number);
    if (isNaN(selectedNum) || selectedNum < 1 || selectedNum > 25) {
      alert("Enter a number between 1-25");
    } else {
      const updatedGrid1 = grid1.map(row => row.map(cell => cell === selectedNum ? '❌' : cell));
      const updatedGrid2 = grid2.map(row => row.map(cell => cell === selectedNum ? '❌' : cell));
      setGrid1(updatedGrid1);
      setGrid2(updatedGrid2);
      setSelectedNumber("");
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      inputRef.current.value = "";

      // Check for winner
      checkWinner(updatedGrid1);
      checkWinner(updatedGrid2);
    }
  };

  return (
    <div>
      <BackIcon/>
      <div className="app">
      <div className="p1">
        <h1>Player 1</h1>
          <p>{lineThrough} </p>
          
        
        <Grid  grid={grid1} selectedNumber={selectedNumber} />
        </div>
        <div className="p1">
          <h1>Player 2</h1>
          <p>{secLineThrough} </p>
       
        <Grid  grid={grid2} selectedNumber={selectedNumber} />
        </div>
      </div>
      <div className="app2">
        <h3>Player {currentPlayer === 1 ? "One" : "Two"}'s Turn</h3>
        <input
          ref={inputRef}
          type="number"
          placeholder="Enter a number"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
        />
        <button onClick={() => handleSelectNumber(selectedNumber)}>
          Select Number
        </button>
      </div>
    </div>
  );
}

export default Bingo;
