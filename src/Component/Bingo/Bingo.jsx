import React, { useState } from 'react';

const Bingo = () => {
  const generateBingoNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const [bingoNumbers, setBingoNumbers] = useState(generateBingoNumbers());
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [isWinner, setIsWinner] = useState(false);

  const handleClick = (number) => {
    if (!isWinner) {
      setSelectedNumbers((prevSelectedNumbers) => {
        const newSelectedNumbers = new Set(prevSelectedNumbers);
        newSelectedNumbers.add(number);
        return newSelectedNumbers;
      });
      if (selectedNumbers.size === 24) {
        setIsWinner(true);
      }
    }
  };

  const renderNumber = (number) => {
    const isSelected = selectedNumbers.has(number);
    return (
      <div
        key={number}
        className={`number ${isSelected ? 'selected' : ''}`}
        onClick={() => handleClick(number)}
      >
        {number}
      </div>
    );
  };

  return (
    <div className="bingo">
      <h1>Bingo Game</h1>
      <div className="bingo-card">
        {bingoNumbers.map((number) => renderNumber(number))}
      </div>
      {isWinner && <h2>Congratulations! You've got BINGO!</h2>}
    </div>
  );
};

export default Bingo;
