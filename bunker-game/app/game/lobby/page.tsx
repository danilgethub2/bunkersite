'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Lobby() {
  const [playerName, setPlayerName] = useState('');
  const [playerCount, setPlayerCount] = useState(6);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerCount(Number(e.target.value));
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }
    
    // В реальной игре здесь создалась бы игровая сессия
    // и данные сохранялись бы на сервере
    
    // Идем на страницу игры, передавая параметры через URL
    router.push(`/game/room?name=${encodeURIComponent(playerName)}&players=${playerCount}`);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Создание игры</h1>
        
        <div className="form-group">
          <label htmlFor="playerName">Ваше имя:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={handleNameChange}
            placeholder="Введите ваше имя"
            className="input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="playerCount">Количество игроков:</label>
          <select
            id="playerCount"
            value={playerCount}
            onChange={handlePlayerCountChange}
            className="select"
          >
            {[4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="actions">
          <button onClick={handleStartGame} className="start-button">
            Начать игру
          </button>
          <Link href="/">
            <button className="back-button">Назад</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .input, .select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .back-button {
          background-color: #777;
        }
        
        .back-button:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  );
} 