import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState('');

  function checkLove() {
    if (!nickname.trim()) {
      setResult('Пожалуйста, введите ник.');
      return;
    }
    // 50/50 шанс
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
        backgroundColor: '#00BFFF', // голубой фон
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '0 20px',
        textAlign: 'center',
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
          width: '250px',
          fontSize: '16px',
          marginTop: '20px',
          outline: 'none',
        }}
      />

      <button
        onClick={checkLove}
        style={{
          marginTop: '15px',
          padding: '10px 25px',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: 'white',
          color: '#00BFFF',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0f7ff')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
      >
        Проверить
      </button>

      {result && (
        <p style={{ marginTop: '25px', fontSize: '20px', fontWeight: 'bold' }}>
          {result}
        </p>
      )}
    </div>
  );
}
