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

// Тексты твитов для каждой карты
const tweetTexts = {
  'irys1.png': "@Rez_aahmadi loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys2.png': "@xaitoshi_ loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys3.png': "@DMacOnchain loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys4.png': "@0xGala loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys5.png': "@quang250802 loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys6.png': "@retreeq_ loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys7.png': "@misterwestwolf loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
  'irys8.png': "Iryna loves you! I'm Spirit of @irys_xyz - JOIN ME https://www.iryna-checker-meme.app/",
};

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
      x = (containerWidth - (elapsed * 0.12)) % (width + containerWidth);
      el.style.transform = `translateX(${x}px)`;
      animationFrameId = requestAnimationFrame(step);
    }
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  function onCardClick(index) {
    if (flippedIndex === null) {
      setFlippedIndex(index);
      setShowResult(true);
    } else if (flippedIndex === index) {
      setFlippedIndex(null);
      setShowResult(false);
    }
  }

  // Получаем имя файла выбранной карты для твита
  const selectedImg = flippedIndex !== null ? shuffledCards[flippedIndex] : null;
  const tweetText = selectedImg ? tweetTexts[selectedImg] : '';

  // URL для твита (закодированный)
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <>
      <style jsx>{`
        html, body, body > div, #__next, #__next > div {
          height: 100%;
          margin: 0;
        }
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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        h1 {
          font-family: system-ui, sans-serif;
          font-weight: 400;
          color: #00bfff;
          background-color: black;
          padding: 10px 0;
          margin: 0 0 20px;
          user-select: none;
        }
        .game-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
          padding: 20px 0;
          backdrop-filter: brightness(0.7);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.6);
          flex-grow: 1;
        }
        .card {
          width: 140px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
          user-select: none;
          transition: transform 0.3s ease;
          will-change: transform;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          border-radius: 14px;
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.9);
        }
        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          backface-visibility: hidden;
        }
        .card-front {
          background: url('/iryslogo.png') center center / cover no-repeat;
          background-color: #222;
          box-shadow: inset 0 0 8px #000;
        }
        .card-back {
          background-color: #222;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
          box-shadow: inset 0 0 8px #000;
        }
        .card-back img {
          max-width: 95%;
          max-height: 95%;
          border-radius: 12px;
          user-select: none;
          pointer-events: none;
        }
        #result {
          margin-top: 30px;
          font-size: 26px;
          font-weight: 900;
          text-shadow: 0 0 8px black;
          user-select: none;
          background: rgba(0, 0, 0, 0.8);
          padding: 15px 20px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-left: auto;
          margin-right: auto;
          max-width: 400px;
        }
        #result a {
          color: #00acee;
          font-weight: 900;
          display: inline-block;
          width: 48px;
          height: 48px;
          cursor: pointer;
        }
        #result a img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 0 1px #000);
        }
        /* Бегущий текст справа налево */
        .ticker-container {
          position: fixed;
          top: 0;
          width: 100%;
          height: 35px;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          z-index: 1000;
          background: black;
          display: flex;
          align-items: center;
        }
        .ticker-text {
          white-space: nowrap;
          display: inline-block;
          font-weight: 900;
          font-size: 26px;
          color: #00acee;
          will-change: transform;
          user-select: none;
          padding-left: 100%;
          font-family: system-ui, sans-serif;
        }
      `}</style>

      <div className="ticker-container" aria-hidden="true">
        <div className="ticker-text" ref={tickerRef}>
          DATA BELONGS ON IRYS — DATA BELONGS ON IRYS — DATA BELONGS ON IRYS — 
        </div>
      </div>

      <div className="container" role="main">
        <h1>CHOOSE YOUR LOVE SPRITE</h1>

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
                  <img src={`/${img}`} alt={`irys${i + 1}`} draggable={false} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {showResult && (
          <div id="result" role="status" aria-live="polite">
            <div>Share your love with IRYS</div>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <img src="/twitter.png" alt="Twitter Logo" draggable={false} />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
