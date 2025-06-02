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
    if (flippedIndex !== null) return; // нельзя кликать повторно
    setFlippedIndex(index);
    setShowResult(true);
  }

  return (
    <>
      <style jsx>{`
        body {
          margin: 0;
          background-color: #111;
          color: white;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 720px;
          margin: 40px auto;
          text-align: center;
        }
        .game-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          padding: 20px 0;
        }
        .card {
          width: 100px;
          height: 140px;
          perspective: 800px;
          cursor: pointer;
          user-select: none;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          border-radius: 10px;
          box-shadow: 0 0 10px #000;
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
        }
        .card-front {
          background: url('/iryslogo.png') center center / cover no-repeat;
          background-color: #222;
        }
        .card-back {
          background-color: #222;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }
        .card-back img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 8px;
        }
        #result {
          margin-top: 25px;
          font-size: 22px;
          color: white;
          font-weight: bold;
        }
        #result a {
          color: #00acee;
          text-decoration: none;
          font-weight: bold;
          margin-left: 8px;
        }
      `}</style>

      <div className="container">
        <h1>Игра "Угадай карту"</h1>

        <div className="game-container">
          {shuffledCards.map((img, i) => (
            <div
              key={i}
              className={`card ${flippedIndex === i ? 'flipped' : ''}`}
              onClick={() => onCardClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onCardClick(i);
              }}
            >
              <div className="card-inner">
                <div className="card-front" />
                <div className="card-back">
                  <img src={`/${img}`} alt={`irys${i + 1}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {showResult && (
          <div id="result">
            ПОЗДРАВЛЯЮ, ИРИС ЛЮБИТ ТЕБЯ
            <a href="https://twitter.com/irys_xyz" target="_blank" rel="noopener noreferrer">
              @irys_xyz
            </a>
          </div>
        )}
      </div>
    </>
  );
}
