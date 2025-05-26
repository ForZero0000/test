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
    const newBoard = [...board];
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
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

    const moveLeft = (arr) => {
      let rowVals = arr.filter((v) => v !== 0);
      for (let i = 0; i < rowVals.length - 1; i++) {
        if (rowVals[i] === rowVals[i + 1]) {
          rowVals[i] *= 2;
          setScore((s) => s + rowVals[i]);
          rowVals.splice(i + 1, 1);
        }
      }
      while (rowVals.length < size) rowVals.push(0);
      return rowVals;
    };

    if (direction === 'left') {
      for (let row = 0; row < size; row++) {
        let rowVals = newBoard.slice(row * size, row * size + size);
        rowVals = moveLeft(rowVals);
        for (let i = 0; i < size; i++) {
          newBoard[row * size + i] = rowVals[i];
        }
      }
    } else if (direction === 'right') {
      for (let row = 0; row < size; row++) {
        let rowVals = newBoard.slice(row * size, row * size + size).reverse();
        rowVals = moveLeft(rowVals);
        rowVals.reverse();
        for (let i = 0; i < size; i++) {
          newBoard[row * size + i] = rowVals[i];
        }
      }
    } else if (direction === 'up') {
      for (let col = 0; col < size; col++) {
        let colVals = [];
        for (let row = 0; row < size; row++) {
          colVals.push(newBoard[row * size + col]);
        }
        colVals = moveLeft(colVals);
        for (let row = 0; row < size; row++) {
          newBoard[row * size + col] = colVals[row];
        }
      }
    } else if (direction === 'down') {
      for (let col = 0; col < size; col++) {
        let colVals = [];
        for (let row = 0; row < size; row++) {
          colVals.push(newBoard[row * size + col]);
        }
        colVals.reverse();
        colVals = moveLeft(colVals);
        colVals.reverse();
        for (let row = 0; row < size; row++) {
          newBoard[row * size + col] = colVals[row];
        }
      }
    }

    addRandomTile(newBoard);
    setBoard(newBoard);
  }

  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor: 'black',
        padding: '1rem',
        borderRadius: '20px',
      }}
    >
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
        {['up', 'left', 'down', 'right'].map((dir) => (
          <button
            key={dir}
            onClick={() => handleMove(dir)}
            style={{
              padding: '13px 27px',
              borderRadius: '20px',
              backgroundColor: '#00BFFF',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '12px',
              margin: '0 5px 10px 5px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {dir.charAt(0).toUpperCase() + dir.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ fontWeight: 'bold', color: 'white' }}>Score: {score}</div>
    </div>
  );
}

function Marquee() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', background: 'black', color: 'white' }}>
      <div
        style={{
          display: 'inline-block',
          animation: 'marquee 30s linear infinite',
        }}
      >
        FUTURE OF ALL WOLRD DATA - THE DATA IS PROGRAMMABLE - More data. Lower cost. Greater utility - PROGAMMABLE DATA, ZERO LIMITS - DATA BELONGS ON IRYS
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [loved, setLoved] = useState(false);

  return (
    <>
      <Marquee />
      <div
        style={{
          backgroundImage: 'url(/irys.png)',
          backgroundSize: 'cover',
          minHeight: '100vh',
          padding: '2rem',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '2rem',
        }}
      >
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Game2048 />
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <Image src="/IMG_1271 (2).webp" alt="Iryna" width={200} height={200} style={{ borderRadius: '20px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <input
              type="text"
              placeholder="do you love Iryna?"
              style={{
                padding: '12px 20px',
                borderRadius: '30px',
                border: 'none',
                width: '130%',
                marginBottom: '10px',
              }}
            />
            <button
              onClick={() => setLoved(true)}
              style={{
                padding: '12px 30px',
                borderRadius: '30px',
                backgroundColor: '#00BFFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                width: '130%',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Check
            </button>
            {loved && <p style={{ fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>IRYNA LOVES YOU, DEAR!</p>}
          </div>

          <div style={{ flexShrink: 0 }}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src="/twitter.png" alt="Twitter" width={60} height={60} style={{ borderRadius: '12px' }} />
            </a>
          </div>
        </div>
      </div>
      <Marquee />
    </>
  );
}
