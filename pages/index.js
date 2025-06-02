import { useState, useEffect } from 'react';

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
  const [modalOpen, setModalOpen] = useState(false);

  function onCardClick(index) {
    if (flippedIndex === null) {
      setFlippedIndex(index);
    } else if (flippedIndex === index) {
      setFlippedIndex(null);
    }
  }

  const tweetTextRaw = flippedIndex !== null ? tweetTexts[shuffledCards[flippedIndex]] : '';
  const tweetText = encodeURIComponent(tweetTextRaw);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  // Закрытие модалки по ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }
    if (modalOpen) {
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

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
        .gif-title {
          display: block;
          margin: 0 auto 20px;
          width: 420px;
          max-width: 100%;
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
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
          transform-style: preserve-3d;
          border-radius: 14px;
          box-shadow: 0 0 14px rgba(0, 0, 0, 0.9);
          background: black;
          backface-visibility: hidden;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
        /* Модальное окно */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1500;
        }
        .modal-content {
          background: black;
          padding: 30px 40px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 480px;
          width: 90%;
          box-sizing: border-box;
          color: white;
          user-select: none;
          gap: 20px;
        }
        .modal-text {
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
          flex: 1;
          text-align: left;
          color: #00bfff;
        }
        .modal-twitter-button {
          width: 48px;
          height: 48px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .modal-twitter-button img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 2px #000);
          user-select: none;
          pointer-events: none;
        }

        /* Остальной стиль не меняется */

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
      </div>

      {modalOpen && flippedIndex !== null && (
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div id="modal-title" className="modal-text">SHARE YOUR LOVE RIGHT NOW</div>
            <a
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-twitter-button"
              aria-label="Share on Twitter"
              onClick={closeModal}
            >
              <img src="/twitter.png" alt="Twitter Logo" draggable={false} />
            </a>
          </div>
        </div>
      )}

      {/* Кнопка для открытия модалки под результатом */}
      {flippedIndex !== null && !modalOpen && (
        <div style={{textAlign: 'center', marginTop: '15px'}}>
          <button
            onClick={openModal}
            style={{
              backgroundColor: '#00acee',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '700',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              userSelect: 'none',
            }}
          >
            Share on Twitter
          </button>
        </div>
      )}
    </>
  );
}
