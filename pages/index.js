import Image from 'next/image';
import { useState, useEffect } from 'react';

const size = 4;

// Цвета плиток от желтого (2) к голубому (2048)
const colors = {
  0: '#eee4da',
  2: '#fffde7',   // очень светлый желтый
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
    let newBoard = [...board];

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
    // Можно добавить реализацию для up, right, down

    addRandomTile(newBoard);
    setBoard(newBoard);
  }

  return (
    <div style={{ textAlign: 'center' }}>
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

      <div style={{ marginBottom: '20px' }}>
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
        {/* Здесь можно добавить Right, Up, Down кнопки */}
      </div>

      <div style={{ fontWeight: 'bold' }}>Score: {score}</div>
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
        justifyContent: 'space-between',
      }}
    >
      {/* Черный закругленный блок с текстом и фото */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
        }}
      >
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="do you love Iryna?"
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: 'none',
              marginRight: '1rem',
              width: '250px',
            }}
          />
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
          {loved && (
            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
              IRYNA LOVES YOU, DEAR!
            </p>
          )}
        </div>
        <div style={{ flexShrink: 0, marginLeft: '2rem' }}>
          <Image src="/IMG_1271 (2).webp" alt="Iryna" width={300} height={400} style={{ borderRadius: '20px' }} />
          <a
            href="https://x.com/intent/post?text=THE%20DATA%20IS%20PROGRAMMABLE%20with%20%40irys_xyz%0A%0AIryna%20LOVES%20ME!%20What%20about%20you%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/twitter.png" alt="Twitter" width={40} height={40} style={{ marginTop: '1rem', cursor: 'pointer' }} />
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
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'scroll 20s linear infinite',
            fontSize: '3rem', // Увеличенный шрифт
            color: 'white',
          }}
        >
          FUTURE OF ALL WOLRD DATA - THE DATA IS PROGRAMMABLE - More data. Lower cost. Greater utility - PROGAMMABLE DATA, ZERO LIMITS - DATA BELONGS ON IRYS —
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
