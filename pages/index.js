import React, { useState, useEffect } from 'react';

const size = 4;

// Цвета плиток от желтого (2) к голубому (2048)
const colors = {
  0: '#eee4da',
  2: '#f9f6f2',
  4: '#fff176',   // желтый
  8: '#64b5f6',   // голубой
  16: '#42a5f5',
  32: '#2196f3',
  64: '#1e88e5',
  128: '#1976d2',
  256: '#1565c0',
  512: '#0d47a1',
  1024: '#90caf9',
  2048: '#64b5f6', // голубой
};

function Game2048() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);

  useEffect(() => {
    addRandomTile(board);
    addRandomTile(board);
    setBoard([...board]);
  }, []);

  function createEmptyBoard() {
    return Array(size * size).fill(0);
  }

  function addRandomTile(board) {
    const emptyIndices = board
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndices.length === 0) return false;
    const randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randIndex] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  function handleMove(direction) {
    // Простейшая обработка движения (для примера)
    let newBoard = [...board];

    // Сдвиг влево (только реализуем, остальные можно добавить)
    if (direction === 'left') {
      for (let row = 0; row < size; row++) {
        let rowVals = newBoard.slice(row * size, row * size + size).filter((v) => v !== 0);

        for (let i = 0; i < rowVals.length - 1; i++) {
          if (rowVals[i] === rowVals[i + 1]) {
            rowVals[i] *= 2;
            setScore((s) => s + rowVals[i]);
            rowVals.splice(i + 1, 1);
          }
        }
        while (rowVals.length < size) rowVals.push(0);

        for (let i = 0; i < size; i++) {
          newBoard[row * size + i] = rowVals[i];
        }
      }
    }
    // Тут можно добавить движения в другие стороны по желанию

    addRandomTile(newBoard);
    setBoard(newBoard);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 80px)`, // плитки 80x80, в 2 раза больше стандартных 40
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {board.map((val, idx) => (
          <div
            key={idx}
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors[val] || '#eee',
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
              color: val > 4 ? 'white' : 'black',
              userSelect: 'none',
            }}
          >
            {val !== 0 ? val : ''}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        {/* Кнопки управления (больше в 2 раза, закруглённые) */}
        <button
          onClick={() => handleMove('left')}
          style={{
            padding: '20px 40px',
            borderRadius: '20px',
            backgroundColor: '#00BFFF',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '0 10px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Left
        </button>
        {/* Добавь Right, Up, Down при необходимости */}
      </div>

      <div style={{ fontWeight: 'bold' }}>Score: {score}</div>
    </div>
  );
}

export default Game2048;
