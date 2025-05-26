import { useEffect, useState } from 'react';
import Image from 'next/image';

const SIZE = 4;

const COLOR_MAP = {
  2: '#ffff99', // light yellow
  4: '#ffff66',
  8: '#ffff33',
  16: '#ffcc00',
  32: '#ff9900',
  64: '#ff6600',
  128: '#ff3333',
  256: '#cc33ff',
  512: '#9966ff',
  1024: '#3399ff',
  2048: '#00ccff', // blue
};

function getRandomEmptyCell(board) {
  const emptyCells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) emptyCells.push([r, c]);
    }
  }
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function spawnTile(board) {
  const newBoard = board.map(row => [...row]);
  const cell = getRandomEmptyCell(newBoard);
  if (cell) {
    const [r, c] = cell;
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  return newBoard;
}

function moveLeft(board) {
  let moved = false;
  const newBoard = board.map(row => {
    const newRow = row.filter(n => n !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = 0;
        moved = true;
      }
    }
    const filtered = newRow.filter(n => n !== 0);
    while (filtered.length < SIZE) filtered.push(0);
    if (filtered.some((v, i) => v !== row[i])) moved = true;
    return filtered;
  });
  return { board: newBoard, moved };
}

function rotateBoard(board) {
  return board[0].map((_, i) => board.map(row => row[i]).reverse());
}

function move(board, direction) {
  let newBoard = board;
  let rotated = 0;

  switch (direction) {
    case 'up':
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
      rotated = 3;
      break;
    case 'right':
      newBoard = rotateBoard(rotateBoard(newBoard));
      rotated = 2;
      break;
    case 'down':
      newBoard = rotateBoard(newBoard);
      rotated = 1;
      break;
  }

  const { board: movedBoard, moved } = moveLeft(newBoard);

  for (let i = 0; i < (4 - rotated) % 4; i++) {
    movedBoard = rotateBoard(movedBoard);
  }

  return { board: movedBoard, moved };
}

export default function Home() {
  const [board, setBoard] = useState(() => spawnTile(spawnTile(Array(SIZE).fill().map(() => Array(SIZE).fill(0)))));

  useEffect(() => {
    const handleKeyDown = (e) => {
      const direction = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      }[e.key];

      if (direction) {
        const { board: newBoard, moved } = move(board, direction);
        if (moved) setBoard(spawnTile(newBoard));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  return (
    <div
      style={{
        backgroundImage: 'url("/irys.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px',
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Do you love Irys?</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${SIZE}, 80px)`,
        gap: '10px',
        backgroundColor: '#222',
        padding: '10px',
        borderRadius: '20px',
      }}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} style={{
              width: '80px',
              height: '80px',
              backgroundColor: COLOR_MAP[cell] || '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#000',
              borderRadius: '10px',
            }}>
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>

      <p style={{ color: '#fff', marginTop: '20px', fontSize: '20px' }}>
        I LOVE IRYS VERY MUCH!
      </p>

      <img
        src="/IMG_1271 (2).webp"
        alt="Iryna"
        style={{ marginTop: '30px', maxWidth: '300px', borderRadius: '20px' }}
      />

      <a
        href="https://x.com/intent/post?text=THE%20DATA%20IS%20PROGRAMMABLE%20with%20%40irys_xyz%0A%0AIryna%20LOVES%20ME!%20What%20about%20you%3F"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: '20px' }}
      >
        <img
          src="/twitter.png"
          alt="Twitter Share"
          style={{ width: '50px', height: '50px', marginTop: '10px' }}
        />
      </a>
    </div>
  );
}
