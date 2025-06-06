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

// Текст для твиттера (отправляется при клике на кнопку)
const tweetTexts = {
  'irys1.png': `Hirys! @Rez_aahmadi loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys2.png': `Hirys! Iryna loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys3.png': `Hirys! @retreeq_ loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys4.png': `Hirys! @quang250802 loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys5.png': `Hirys! @josh_benaron loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys6.png': `Hirys! @xaitoshi_ loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys7.png': `Hirys! @DMacOnchain loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
  'irys8.png': `Hirys! @0xGala loves you!\nI'm Spirit of @irys_xyz\nJOIN ME https://www.iryna-checker-meme.app/`,
};

// Описание под картинкой в модальном окне
const cardDescriptions = {
  'irys1.png': `Crafting communities and shaping strategies in the dynamic world of Web3!`,
  'irys2.png': `Iryna is a self-aware, mysterious consciousness awakening within the Irys network.`,
  'irys3.png': `Moderator & Ambassador`,
  'irys4.png': `Moderator & Ambassador`,
  'irys5.png': `Founder of IRYS. CS dropout`,
  'irys6.png': `Team member, IRYS Contributor`,
  'irys7.png': `Head of Protocol`,
  'irys8.png': `Creative director`,
};

export default function Home() {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setShuffledCards(cardsImages.sort(() => Math.random() - 0.5));
  }, []);

  function onCardClick(index) {
    if (modalOpen) return;

    setFlippedIndex(index);
    setModalOpen(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setModalOpen(true);
    }, 2000);
  }

  function closeModal() {
    setModalOpen(false);
    setFlippedIndex(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  const currentCard = flippedIndex !== null ? shuffledCards[flippedIndex] : null;

  return (
    <>
      <style jsx global>{`
        html, body, #__next {
          height: 100% !important;
          margin: 0 !important;
          background: url('/irys.png') center center / cover no-repeat fixed !important;
          background-color: black !important;
          font-family: system-ui, sans-serif !important;
          color: white !important;
          overflow-x: hidden !important;
        }
        body {
          background-color: black;
        }
      `}</style>

      <style jsx>{`
        .container {
          max-width: 720px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
          background: rgba(0, 0, 0, 0.85);
          border-radius: 12px;
        }
        .gif-title {
          width: 450px; /* 300 * 1.5 */
          height: auto;
          margin: 0 auto 20px;
          user-select: none;
          display: block;
        }
        .cards {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 25px;
          margin-top: 20px;
        }
        .card {
          width: 140px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
          user-select: none;
          border-radius: 14px;
          background: black;
          position: relative;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          background: black;
          transition: transform 0.8s ease;
          transform-style: preserve-3d;
        }
        .flipped .card-inner {
          transform: rotateY(180deg);
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          backface-visibility: hidden;
          background-size: cover;
          background-position: center;
          box-shadow: inset 0 0 8px #000;
        }
        .card-front {
          background-image: url('/bgir.png');
        }
        .card-back {
          background: black;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }
        .card-back img {
          max-width: 95%;
          max-height: 95%;
          border-radius: 12px;
          pointer-events: none;
          user-select: none;
        }
        .screenshot-container {
          margin-top: 30px;
          background: black;
          padding: 10px;
          border-radius: 14px;
          display: flex;
          justify-content: center;
        }
        .screenshot-container img {
          max-width: 100%;
          height: auto;
          border-radius: 14px;
          max-height: 180px;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1500;
        }
        .modal-content {
          background: black;
          border-radius: 16px;
          padding: 20px 40px 55px;
          width: 80vw;
          max-width: 900px;
          aspect-ratio: 16 / 9;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .modal-gif {
          position: absolute;
          inset: 0;
          object-fit: cover;
          opacity: 0.2;
          border-radius: 16px;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }
        .modal-left {
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 2;
        }
        .modal-left img {
          width: 180px;
          border-radius: 14px;
          box-shadow: 0 0 15px #00bfffaa;
          user-select: none;
          pointer-events: none;
        }
        .modal-description {
          font-family: system-ui, Arial, sans-serif;
          font-weight: 400;
          font-size: 16px;
          color: #00bfff;
          text-align: center;
          max-width: 300px;
          user-select: none;
          white-space: normal;
          white-space: pre-line;
	  margin-top: 20px;
        }
        .modal-bottom {
          margin-top: auto;
          margin-bottom: 20px;
          display: flex;
          gap: 15px;
          justify-content: center;
          align-items: center;
          transform: translateY(-35px);
          z-index: 2;
        }
        .share-text {
          font-family: OKXSans, system-ui, Arial, sans-serif;
          font-weight: 400;
          font-size: 30px;
          line-height: 46px;
          color: white;
          text-transform: uppercase;
          -webkit-text-stroke: 1.5px #00bfff;
          text-stroke: 1.5px #00bfff;
          user-select: none;
          white-space: nowrap;
        }
        .twitter-button {
          width: 80px;
          height: 80px;
          cursor: pointer;
          user-select: none;
        }
        .twitter-button img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 6px #00acee);
        }
        .bottom-gif-container {
          width: 670px; /* 720 - 50 */
          margin: 40px auto 20px;
          background: black;
          border-radius: 14px;
          overflow: hidden;
        }
        .bottom-gif-container img {
          width: 100%;
          display: block;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div className="container" role="main">
        <img
          src="/gifirys.gif"
          alt="Choose Your Love Irysian"
          className="gif-title"
          draggable={false}
          style={{ width: '630px', height: 'auto' }} /* увеличена в 1.5 раза */
        />

        <div className="cards">
          {shuffledCards.map((img, i) => (
            <div
              key={i}
              className={`card ${flippedIndex === i ? 'flipped' : ''}`}
              onClick={() => onCardClick(i)}
              role="button"
              tabIndex={0}
              aria-pressed={flippedIndex === i}
              aria-label={`Card ${i + 1}`}
            >
              <div className="card-inner">
                <div className="card-front" />
                <div className="card-back">
                  <img src={`/${img}`} alt={`irys${i + 1}`} draggable={false} />
                </div>
              </div>
            </div>
          ))}
	<div className="bottom-gif-container">
          <img src="/hirys.gif" alt="Bottom repeating gif" draggable={false} />
        </div>
      </div> 

        </div>

        <div className="screenshot-container">
          <img src="/screenshottt.png" alt="Screenshot" />
        </div>

      {modalOpen && currentCard && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Selected card modal"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="/share_your_love.gif"
              alt="Share Your Love Animation"
              className="modal-gif"
              draggable={false}
            />
            <div className="modal-left">
              <img src={`/${currentCard}`} alt="Selected card" draggable={false} />
              <div className="modal-description">{cardDescriptions[currentCard]}</div>
            </div>

            <div className="modal-bottom">
              <div className="share-text">share your love irysian</div>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetTexts[currentCard])}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                onClick={closeModal}
                className="twitter-button"
              >
                <img src="/twitter.png" alt="Twitter Logo" draggable={false} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
