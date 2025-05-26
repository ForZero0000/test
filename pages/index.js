import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState('');

  function checkLove() {
    if (!nickname.trim()) {
      setResult('Пожалуйста, введите ник.');
      return;
    }
    const love = Math.random() < 0.5;
    setResult(
      love
        ? `${nickname}, Iryna loves you.`
        : `${nickname}, Iryna loves you very much!`
    );
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/irys.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '60px 20px 100px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Чёрный закруглённый блок */}
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '30px',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          maxWidth: '1000px',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* Левая часть — текст и кнопка */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            marginRight: '20px',
          }}
        >
          <h1>Irys Love Checker</h1>
          <p>Проверка на Sybil от Irys</p>

          <input
            type="text"
            placeholder="Введите ваш ник"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{
              borderRadius: '30px',
              padding: '10px 20px',
              border: 'none',
              width: '100%',
              fontSize: '16px',
              marginTop: '20px',
              outline: 'none',
            }}
          />

          <button
            onClick={checkLove}
            style={{
              marginTop: '15px',
              padding: '12px 15px', // в 2 раза уже
              borderRadius: '30px',
              border: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s, color 0.3s',
              userSelect: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Check
          </button>

          {result && (
            <p
              style={{
                marginTop: '25px',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {result}
            </p>
          )}
        </div>

        {/* Правая часть — фото */}
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
          <img
            src="/IMG_1271 (2).webp"
            alt="Iryna"
            style={{
              borderRadius: '20px',
              maxWidth: '100%',
              height: 'auto',
              boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
            }}
          />
        </div>
      </div>

      {/* Бегущая строка */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'marquee 20s linear infinite',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          FUTURE OF ALL WORLD DATA – THE DATA IS PROGRAMMABLE – More data. Lower cost. Greater utility – PROGRAMMABLE DATA, ZERO LIMITS – DATA BELONGS ON IRYS —
        </div>
      </div>

      {/* Анимация */}
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
