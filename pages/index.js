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

const tweetTexts = {
  'irys1.png': `@Rez_aahmadi loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys2.png': `@xaitoshi_ loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys3.png': `@DMacOnchain loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys4.png': `@0xGala loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys5.png': `@quang250802 loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys6.png': `@retreeq_ loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys7.png': `loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys8.png': `Iryna loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
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
  const [showShareText, setShowShareText] = useState(false);

  function onCardClick(index) {
    setShowShareText(false);
    if (flippedIndex === null) {
      setFlippedIndex(index);
      setShowResult(true);
    } else if (flippedIndex === index) {
      setFlippedIndex(null);
      setShowResult(false);
    }
  }

  function onTweetClick() {
    setShowShareText(true);
  }

  const tickerText = Array(24).fill('DATA BELONGS ON IRYS').join(' - ');
  const tweetTextRaw = flippedIndex !== null ? tweetTexts[shuffledCards[flippedIndex]] : '';
  const tweetText = encodeURIComponent(tweetTextRaw);

  return (
    <>
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: url('/irys.png') center center / auto 100% no-repeat fixed;
          background-color: black;
          font-family: Arial, sans-serif;
          color: white;
          background-attachment: fixed;
        }
      `}</style>
      <style jsx>{`
        .container {
          max-width: 720px;
          margin: 40px auto;
          text-align: center;
          background: black;
          border-radius: 12px;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
          color: white;
        }
        h1 {
          margin: 0 0 20px;
          user-select: none;
        }
        .gif-title {
          display: block;
          margin: 0 auto 20px;
          max-width: 280px;
          width: 100%;
          user-select: none;
        }
        .game-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
          padding: 20px 0;
          background: black;
          border-radius: 12px;
          flex-grow: 1;
          box-sizing: border-box;
        }
        .card, .card-inner, .card-front, .card-back {
          box-sizing: border-box;
        }
        .card {
          width: 140px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
          user-select: none;
          transition: transform 0.3s ease;
          will-change: transform;
          background: black;
          border-radius: 14px;
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          border-radius: 14px;
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.9);
          background: black;
          backface-visibility: hidden;
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
          background: black;
          backface-visibility: hidden;
        }
        .card-front {
          background: url('/cdpcRzVY_400x400 (8).jpg') center center / cover no-repeat;
          box-shadow: inset 0 0 8px #000;
        }
        .card-back {
          background-color: black;
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
          font-size: 22px;
          font-weight: 700;
          white-space: pre-line;
          text-shadow: 0 0 8px black;
          user-select: none;
          background: black;
          padding: 20px;
          border-radius: 12px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-left: auto;
          margin-right: auto;
          max-width: 420px;
          color: white;
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
        .share-text {
          font-size: 20px;
          font-weight: 700;
          color: #00bfff;
          text-transform: uppercase;
          user-select: none;
        }
        /* Бегущий текст слева направо */
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
          user-select: none;
          font-family: system-ui, sans-serif;
          animation: tickerMove 40s linear infinite;
          padding-left: 0;
          margin-left: -100%;
        }
        @keyframes tickerMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <div className="ticker-container" aria-hidden="true">
        <div className="ticker-text">{Array(24).fill('DATA BELONGS ON IRYS').join(' - ')}</div>
      </div>

      <div className="container" role="main">
        {/* gif вместо заголовка */}
        <img src="/gifirys.gif" alt="Choose Your Love Irysian" className="gif-title" draggable={false} />

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
            <div className="share-text">SHARE YOUR LOVE RIGHT NOW</div>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetTexts[shuffledCards[flippedIndex]])}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              onClick={() => setShowShareText(true)}
            >
              <img src="/twitter.png" alt="Twitter Logo" draggable={false} />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
