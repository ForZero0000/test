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
        ? `${nickname}, Irina loves you.`
        : `${nickname}, Irina loves you very much!`
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#00BFFF',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 40px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}
    >
      {/* Левая часть: ввод и кнопка */}
      <div
        style={{
          flex: '1',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginRight: '40px',
          transform: 'translateX(50px)', // сдвигаем чуть правее
        }}
      >
        <h1 style={{ marginBottom: '10px' }}>Irys Love Checker</h1>
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
            padding: '12px 30px',
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
            e.currentTarget.style.color = '#00BFFF';
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
              color: 'white',
            }}
          >
            {result}
          </p>
        )}
      </div>

      {/* Правая часть: фотография */}
      <div
        style={{
          flex: '1',
          maxWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src="/IMG_1271 (2).webp"
          alt="Irina"
          style={{
            borderRadius: '20px',
            maxWidth: '100%',
            height: 'auto',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
}
