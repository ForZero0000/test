import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Game2048 = dynamic(() => import('@/components/Game2048'), { ssr: false });

export default function Home() {
  const [loved, setLoved] = useState(false);

  return (
    <div
      style={{
        backgroundImage: 'url(/irys.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Обёртка для фото и формы — чёрный закруглённый прямоугольник */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black', borderRadius: '20px', padding: '2rem' }}>
        <div style={{ flex: 1, color: 'white' }}>
          <input
            type="text"
            placeholder="do you love Iryna?"
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: 'none',
              marginRight: '1rem',
              width: '250px',
            }}
          />
          <button
            onClick={() => setLoved(true)}
            style={{
              padding: '10px 30px',
              borderRadius: '30px',
              backgroundColor: '#00BFFF',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Check
          </button>
          {loved && (
            <p style={{ fontWeight: 'bold', marginTop: '1rem', color: 'white' }}>
              IRYNA LOVES YOU, DEAR!
            </p>
          )}
        </div>
        <div style={{ flexShrink: 0, marginLeft: '2rem' }}>
          <Image src="/IMG_1271 (2).webp" alt="Iryna" width={300} height={400} style={{ borderRadius: '20px' }} />
          <a
            href="https://x.com/intent/post?text=THE%20DATA%20IS%20PROGRAMMABLE%20with%20%40irys_xyz%0A%0AIryna%20LOVES%20ME!%20What%20about%20you%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/twitter.png" alt="Twitter" width={40} height={40} style={{ marginTop: '1rem', cursor: 'pointer' }} />
          </a>
        </div>
      </div>

      {/* Игра 2048 */}
      <div style={{ marginTop: '3rem' }}>
        <Game2048 />
      </div>

      {/* Бегущая строка, увеличенный шрифт */}
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '1rem',
          marginTop: '3rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'scroll 20s linear infinite',
            fontSize: '3rem', // увеличил в 2 раза с 1.5rem
            color: 'white',
          }}
        >
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
