import { useState, useEffect, useRef } from 'react';

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

  // Для плавного бесконечного движения текста справа налево
  const tickerRef = useRef(null);

  useEffect(() => {
    const el = tickerRef.current;
    let animationFrameId;
    let start = null;
    let width = el ? el.offsetWidth : 0;
    let containerWidth = el ? el.parentElement.offsetWidth : 0;
    let x = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // скорость 50 пикселей в секунду
      x = (containerWidth - (elapsed * 0.05)) % (width + containerWidth);
      el.style.transform = `translateX(${x}px)`;
      animationFrameId = requestAnimationFrame(step);
    }
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  function onCardClick(index) {
    if (flippedIndex !== null) return;
    setFlippedIndex(index);
    setShowResult(true);
  }

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 720px;
          margin: 40px auto;
          text-align: center;
          color: white;
          font-family: Arial, sans-serif;
          background: url('/irys.png') center center / cover no-repeat fixed;
          min-height: 100vh;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        .game-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          padding: 20px 0;
          backdrop-filter: brightness(0.7);
          border-radius: 12px;
          background: rgba(0,0,0,0.5);
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
          font-weight: bold;
          text-shadow: 0 0 6px black;
        }
        #result a {
          color: #00acee;
          text-decoration: none;
          font-weight: bold;
          margin-left: 8px;
        }
        /* Бегущий текст справа налево */
        .ticker-container {
          position: fixed;
          top: 10px;
          width: 100%;
          height: 30px;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.3);
        }
        .ticker-text {
          white-space: nowrap;
          display: inline-block;
          font-weight: bold;
          font-size: 24px;
          color: #00acee;
          will-change: transform;
          user-select: none;
          padding-left: 100%;
        }
      `}</style>

      <div className="ticker-container" aria-hidden="true">
        <div className="ticker-text" ref={tickerRef}>
          DATA BELONGS ON IRYS — DATA BELONGS ON IRYS — DATA BELONGS ON IRYS — 
        </div>
      </div>

      <div className="container" role="main">
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
              aria-pressed={flippedIndex === i}
              aria-label={`Карта ${i + 1}`}
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
          <div id="result" role="status" aria-live="polite">
            ПОЗДРАВЛЯЮ, ИРИС ЛЮБИТ ТЕБЯ
            <a
              href="https://twitter.com/irys_xyz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter irys_xyz"
            >
              @irys_xyz
            </a>
          </div>
        )}
      </div>
    </>
  );
}

