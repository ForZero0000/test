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

function Game2048({ score, setScore, board, setBoard }) {
  function addRandomTile(board) {
    const emptyIndices = board
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndices.length === 0) return false;
    const randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randIndex] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  useEffect(() => {
    const newBoard = [...board];
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard([...newBoard]);
  }, []);

  function handleMove(direction) {
    let newBoard = [...board];

    const rotateLeft = (b) => {
      const res = Array(size * size).fill(0);
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          res[(size - c - 1) * size + r] = b[r * size + c];
      return res;
    };

    const rotateRight = (b) => rotateLeft(rotateLeft(rotateLeft(b)));
    const rotateDown = (b) => rotateLeft(rotateLeft(b));
    const processRow = (row) => {
      const nonZero = row.filter((n) => n !== 0);
      for (let i = 0; i < nonZero.length - 1; i++) {
        if (nonZero[i] === nonZero[i + 1]) {
          nonZero[i] *= 2;
          setScore((s) => s + nonZero[i]);
          nonZero.splice(i + 1, 1);
        }
      }
      while (nonZero.length < size) nonZero.push(0);
      return nonZero;
    };

    const move = (b) => {
      let res = [];
      for (let i = 0; i < size; i++) {
        const row = b.slice(i * size, i * size + size);
        res.push(...processRow(row));
      }
      return res;
    };

    if (direction === 'left') newBoard = move(newBoard);
    else if (direction === 'right') newBoard = rotateLeft(move(rotateRight(newBoard)));
    else if (direction === 'up') newBoard = rotateRight(move(rotateLeft(newBoard)));
    else if (direction === 'down') newBoard = rotateDown(move(rotateDown(newBoard)));

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
        {['up', 'down', 'left', 'right'].map((dir) => (
          <button
            key={dir}
            onClick={() => handleMove(dir)}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              backgroundColor: '#00BFFF',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              margin: '5px',
              cursor: 'pointer',
              userSelect: 'none',
              width: 80,
            }}
          >
            {dir.charAt(0).toUpperCase() + dir.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ fontWeight: 'bold' }}>Score: {score}</div>
    </div>
  );
}

export default function Home() {
  const [loved, setLoved] = useState(false);
  const [board, setBoard] = useState(Array(size * size).fill(0));
  const [score, setScore] = useState(0);

  return (
    <div
      style={{
        backgroundImage: 'url(/irys.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      {/* Верхний бегущий текст */}
      <div style={tickerStyle}>
        <div style={tickerInnerStyle}>
          FUTURE OF ALL WOLRD DATA - THE DATA IS PROGRAMMABLE - More data. Lower cost. Greater utility - PROGAMMABLE DATA, ZERO LIMITS - DATA BELONGS ON IRYS —
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {/* Левая часть с чёрным фоном */}
        <div
          style={{
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '1.5rem',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            width: '350px',
          }}
        >
          <Game2048 score={score} setScore={setScore} board={board} setBoard={setBoard} />
        </div>

        {/* Правая часть */}
        <div
          style={{
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '1.5rem',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.2rem',
            width: '350px',
          }}
        >
          <Image
            src="/IMG_1271 (2).webp"
            alt="Iryna"
            width={140}
            height={140}
            style={{ borderRadius: '20px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <input
              type="text"
              placeholder="Do you love Iryna?"
              style={{
                padding: '10px 30px',
                borderRadius: '30px',
                border: 'none',
                width: '260px',
                marginBottom: '0.5rem',
              }}
            />
            <br />
            <button
              onClick={() => setLoved(true)}
              style={{
                padding: '10px 30px',
                borderRadius: '30px',
                backgroundColor: '#00BFFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
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
          <a
            href="https://x.com/intent/post?text=THE%20DATA%20IS%20PROGRAMMABLE%20with%20%40irys_xyz%0A%0AIryna%20LOVES%20ME!%20What%20about%20you%3F%0A%0Acheck%20here%20-%20https%3A%2F%2Fwww.iryna-checker-meme.app%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/twitter.png"
              alt="Twitter"
              width={60}
              height={60}
              style={{ cursor: 'pointer', objectFit: 'contain' }}
            />
          </a>
        </div>
      </div>

      {/* Нижний бегущий текст */}
      <div style={tickerStyle}>
        <div style={tickerInnerStyle}>
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
import { useState } from 'react';

const cardsImages = [
  'irys1.png',
  'irys2.png',
  'irys3.png',
  'irys4.png',
  'irys5.png',
  'irys6.png',
  'irys7.png',
  'irys8.png',
];

// Функция для перемешивания массива
function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const [shuffledCards] = useState(() => shuffle(cardsImages));
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function onCardClick(index) {
    if (flippedIndex !== null) return; // нельзя кликать после выбора
    setFlippedIndex(index);
    setShowResult(true);
  }

  return (
    <>
      <style jsx>{`
        .game-container {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          padding: 20px;
        }
        .card {
          width: 100px;
          height: 140px;
          perspective: 800px;
          cursor: pointer;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          backface-visibility: hidden;
          box-shadow: 0 0 10px #000;
        }
        .card-front {
          background: url('/iryslogo.png') center center / cover no-repeat;
          background-color: #222;
        }
        .card-back {
          background: #222;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-back img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 8px;
        }
        #result {
          margin-top: 25px;
          font-size: 20px;
          color: white;
          text-align: center;
        }
        #result a {
          color: #00acee;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>

      <h1 style={{ color: 'white', textAlign: 'center' }}>Игра "Угадай карту"</h1>

      <div className="game-container">
        {shuffledCards.map((img, i) => (
          <div
            key={i}
            className={`card ${flippedIndex === i ? 'flipped' : ''}`}
            onClick={() => onCardClick(i)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">
                <img src={`/${img}`} alt={`irys${i + 1}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showResult && (
        <div id="result">
          ПОЗДРАВЛЯЮ, ИРИС ЛЮБИТ ТЕБЯ<br />
          <a href="https://twitter.com/irys_xyz" target="_blank" rel="noopener noreferrer">
            @irys_xyz
          </a>
        </div>
      )}
    </>
  );
}
