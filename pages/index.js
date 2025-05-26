import Image from 'next/image';
import { useState, useEffect } from 'react';

const size = 4;

const colors = {
  0: '#eee4da',
  2: '#fffde7',
  4: '#fff176',
  8: '#64b5f6',
  16: '#42a5f5',
  32: '#2196f3',
  64: '#1e88e5',
  128: '#1976d2',
  256: '#1565c0',
  512: '#0d47a1',
  1024: '#90caf9',
  2048: '#64b5f6',
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

  function addRandomTile(board: number[]) {
    const emptyIndices = board
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null) as number[];
    if (emptyIndices.length === 0) return false;
    const randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randIndex] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  function handleMove(direction: string) {
    let newBoard = [...board];

    function getTile(r: number, c: number) {
      return newBoard[r * size + c];
    }

    function setTile(r: number, c: number, val: number) {
      newBoard[r * size + c] = val;
    }

    for (let i = 0; i < size; i++) {
      let line: number[] = [];
      for (let j = 0; j < size; j++) {
        let val;
        if (direction === 'left') val = getTile(i, j);
        if (direction === 'right') val = getTile(i, size - 1 - j);
        if (direction === 'up') val = getTile(j, i);
        if (direction === 'down') val = getTile(size - 1 - j, i);
        if (val !== 0) line.push(val);
      }

      for (let k = 0; k < line.length - 1; k++) {
        if (line[k] === line[k + 1]) {
          line[k] *= 2;
          setScore((s) => s + line[k]);
          line.splice(k + 1, 1);
        }
      }

      while (line.length < size) line.push(0);

      for (let j = 0; j < size; j++) {
        let val = line[j];
        if (direction === 'left') setTile(i, j, val);
        if (direction === 'right') setTile(i, size - 1 - j, val);
        if (direction === 'up') setTile(j, i, val);
        if (direction === 'down') setTile(size - 1 - j, i, val);
      }
    }

    addRandomTile(newBoard);
    setBoard(newBoard);
  }

  const buttonStyle = {
    padding: '13px 26px',
    borderRadius: '20px',
    backgroundColor: '#00BFFF',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'black', padding: '2rem', borderRadius: '20px', width: 'fit-content', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 80px)`,
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

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleMove('up')} style={buttonStyle}>Up</button>
      </div>
      <div>
        <button onClick={() => handleMove('left')} style={buttonStyle}>Left</button>
        <button onClick={() => handleMove('down')} style={buttonStyle}>Down</button>
        <button onClick={() => handleMove('right')} style={buttonStyle}>Right</button>
      </div>

      <div style={{ fontWeight: 'bold', marginTop: '1rem', color: 'white' }}>Score: {score}</div>
    </div>
  );
}

export default function Home() {
  const [loved, setLoved] = useState(false);

  return (
    <div
      style={{
        backgroundImage: 'url(/irys.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* Ввод, кнопка и изображение — компактный блок */}
      <div
        style={{
          display: 'flex',
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '1.5rem',
          color: 'white',
          alignItems: 'center',
          maxWidth: '650px',
        }}
      >
        <Image src="/IMG_1271 (2).webp" alt="Iryna" width={150} height={150} style={{ borderRadius: '20px', marginRight: '2rem' }} />
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="do you love Iryna?"
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: 'none',
              marginBottom: '0.5rem',
              width: '100%',
              maxWidth: '250px',
            }}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={() => setLoved(true)}
              style={{
                padding: '10px 30px',
                borderRadius: '30px',
                backgroundColor: '#00BFFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Check
            </button>
          </div>
          {loved && (
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
              IRYNA LOVES YOU, DEAR!
            </p>
          )}
          <a
            href="https://x.com/intent/post?text=THE%20DATA%20IS%20PROGRAMMABLE%20with%20%40irys_xyz%0A%0AIryna%20LOVES%20ME!%20What%20about%20you%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/twitter.png"
              alt="Twitter"
              width={40}
              height={40}
              style={{ marginTop: '1rem', cursor: 'pointer' }}
            />
          </a>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Game2048 />
      </div>

      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '1rem',
          marginTop: '3rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '90%',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'scroll 20s linear infinite',
            fontSize: '2rem',
            color: 'white',
          }}
        >
          FUTURE OF ALL WORLD DATA - THE DATA IS PROGRAMMABLE - More data. Lower cost. Greater utility - PROGAMMABLE DATA, ZERO LIMITS - DATA BELONGS ON IRYS —
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

