'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const path = searchParams.get('path');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Логика маршрутизации на клиенте
    if (path) {
      // Можно добавить перенаправление на нужные компоненты
      console.log('Requested path:', path);
    }
  }, [path]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Добро пожаловать в игру "Бункер"</h1>
        <p className="description">
          "Бункер" - это увлекательная игра на выживание, где игрокам предстоит решить, 
          кто заслуживает места в бункере после апокалипсиса.
        </p>
        <div className="game-rules">
          <h2 className="subtitle">Правила игры:</h2>
          <ul>
            <li>Каждый игрок получает уникальную карточку персонажа с профессией, здоровьем, хобби и другими характеристиками</li>
            <li>Игроки узнают об условиях катастрофы и характеристиках бункера</li>
            <li>Задача - убедить других, что именно вы должны попасть в бункер</li>
            <li>В каждом раунде один игрок покидает игру путем голосования</li>
            <li>Побеждают те, кто смог попасть в бункер</li>
          </ul>
        </div>
        <div className="actions">
          <Link href="/game/lobby">
            <button className="start-button">Начать игру</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 