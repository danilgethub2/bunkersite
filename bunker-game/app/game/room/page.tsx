'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CharacterCard from '@/app/components/CharacterCard';
import BunkerInfo from '@/app/components/BunkerInfo';
import CatastropheInfo from '@/app/components/CatastropheInfo';
import PlayersList from '@/app/components/PlayersList';
import { generateCharacter, generateBunker, generateCatastrophe } from '@/app/utils/gameGenerator';

// Типы данных для игры
type Character = {
  id: number;
  name: string;
  profession: string;
  age: number;
  gender: string;
  health: string;
  hobby: string;
  phobia: string;
  additionalInfo: string;
  trait: string;
};

type Player = {
  id: number;
  name: string;
  character: Character;
  isEliminated: boolean;
};

type Bunker = {
  size: string;
  supplies: string;
  equipment: string;
  duration: string;
  condition: string;
};

type Catastrophe = {
  type: string;
  description: string;
  consequences: string;
  duration: string;
};

export default function GameRoom() {
  const searchParams = useSearchParams();
  const playerName = searchParams.get('name') || 'Игрок';
  const playerCount = parseInt(searchParams.get('players') || '6');
  
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'voting' | 'results'>('setup');
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [bunker, setBunker] = useState<Bunker | null>(null);
  const [catastrophe, setCatastrophe] = useState<Catastrophe | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [votingFor, setVotingFor] = useState<number | null>(null);
  
  // Инициализация игры
  useEffect(() => {
    // Создаем бункер и катастрофу
    setBunker(generateBunker());
    setCatastrophe(generateCatastrophe());
    
    // Генерируем игроков и их персонажей
    const generatedPlayers: Player[] = Array(playerCount).fill(null).map((_, index) => {
      const isMainPlayer = index === 0;
      return {
        id: index + 1,
        name: isMainPlayer ? playerName : `Игрок ${index + 1}`,
        character: generateCharacter(index + 1),
        isEliminated: false
      };
    });
    
    setPlayers(generatedPlayers);
  }, [playerName, playerCount]);
  
  // Начать игру
  const startGame = () => {
    setGameState('playing');
  };
  
  // Следующий ход
  const nextTurn = () => {
    let nextIndex = currentPlayerIndex + 1;
    
    // Пропускаем выбывших игроков
    while (nextIndex < players.length && players[nextIndex].isEliminated) {
      nextIndex++;
    }
    
    // Если дошли до конца списка игроков, начинаем новый раунд или голосование
    if (nextIndex >= players.length) {
      if (gameState === 'playing') {
        setGameState('voting');
      } else {
        // Подсчет голосов и определение выбывшего игрока
        eliminatePlayer();
        setGameState('playing');
        setRound(round + 1);
        nextIndex = 0;
        
        // Проверка на окончание игры
        const activePlayers = players.filter(p => !p.isEliminated);
        if (activePlayers.length <= playerCount / 2) {
          setGameState('results');
        }
      }
    }
    
    setCurrentPlayerIndex(nextIndex);
  };
  
  // Выбор игрока для голосования
  const voteForPlayer = (playerId: number) => {
    setVotingFor(playerId);
  };
  
  // Исключение игрока
  const eliminatePlayer = () => {
    if (votingFor === null) return;
    
    setPlayers(prev => prev.map(player => 
      player.id === votingFor ? { ...player, isEliminated: true } : player
    ));
    
    setVotingFor(null);
  };
  
  // Определяем текущего игрока
  const currentPlayer = players[currentPlayerIndex] || { name: '', character: {} as Character };

  if (!bunker || !catastrophe || players.length === 0) {
    return <div className="loading">Загрузка игры...</div>;
  }

  return (
    <div className="game-container">
      {gameState === 'setup' && (
        <div className="setup-screen card">
          <h1 className="title">Подготовка к игре</h1>
          
          <div className="game-info">
            <BunkerInfo bunker={bunker} />
            <CatastropheInfo catastrophe={catastrophe} />
          </div>
          
          <div className="player-info">
            <h2 className="subtitle">Ваш персонаж:</h2>
            <CharacterCard character={players[0]?.character} />
          </div>
          
          <div className="instructions">
            <p>
              Игра начинается! Каждый игрок по очереди представляет своего персонажа
              и объясняет, почему именно он должен попасть в бункер.
            </p>
            <p>
              В конце каждого раунда проводится голосование, и один игрок покидает игру.
            </p>
            <p>
              Игра продолжается до тех пор, пока в бункере не останется половина игроков.
            </p>
          </div>
          
          <button className="start-button" onClick={startGame}>
            Начать игру
          </button>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className="playing-screen">
          <div className="game-header card">
            <h2>Раунд {round}</h2>
            <div className="game-status">
              <p>Сейчас ходит: <strong>{currentPlayer.name}</strong></p>
            </div>
          </div>
          
          <div className="game-content">
            <div className="left-panel card">
              <BunkerInfo bunker={bunker} />
              <CatastropheInfo catastrophe={catastrophe} />
            </div>
            
            <div className="center-panel card">
              <h3 className="subtitle">Ваш персонаж:</h3>
              <CharacterCard character={players[0]?.character} />
              
              {currentPlayerIndex === 0 && (
                <div className="actions">
                  <button onClick={nextTurn}>Завершить ход</button>
                </div>
              )}
              
              {currentPlayerIndex !== 0 && (
                <div className="ai-player-turn">
                  <p>{currentPlayer.name} рассказывает, почему он должен выжить...</p>
                  <p className="ai-speech">
                    Я {currentPlayer.character.profession}, и мои навыки будут незаменимы в бункере. 
                    Несмотря на мою {currentPlayer.character.phobia}, я могу предложить {currentPlayer.character.additionalInfo}.
                  </p>
                  {currentPlayerIndex !== 0 && (
                    <button onClick={nextTurn}>Следующий игрок</button>
                  )}
                </div>
              )}
            </div>
            
            <div className="right-panel card">
              <PlayersList 
                players={players} 
                currentPlayerId={currentPlayer.id}
                onPlayerClick={() => {}}
                showStatus={true}
              />
            </div>
          </div>
        </div>
      )}
      
      {gameState === 'voting' && (
        <div className="voting-screen card">
          <h2 className="title">Голосование</h2>
          <p>Выберите игрока, который должен покинуть бункер:</p>
          
          <div className="players-voting-list">
            {players
              .filter(player => !player.isEliminated && player.id !== 1) // Исключаем главного игрока
              .map(player => (
                <div 
                  key={player.id}
                  className={`player-vote-item ${votingFor === player.id ? 'selected' : ''}`}
                  onClick={() => voteForPlayer(player.id)}
                >
                  <span>{player.name}</span>
                  <span>{player.character.profession}</span>
                </div>
              ))}
          </div>
          
          <button 
            onClick={nextTurn} 
            disabled={votingFor === null}
            className="confirm-vote-button"
          >
            Подтвердить выбор
          </button>
        </div>
      )}
      
      {gameState === 'results' && (
        <div className="results-screen card">
          <h2 className="title">Игра завершена!</h2>
          
          <div className="survivors">
            <h3 className="subtitle">Выжившие:</h3>
            <ul className="survivors-list">
              {players
                .filter(player => !player.isEliminated)
                .map(player => (
                  <li key={player.id}>
                    <strong>{player.name}</strong> - {player.character.profession}
                  </li>
                ))}
            </ul>
          </div>
          
          <div className="actions">
            <Link href="/">
              <button>В главное меню</button>
            </Link>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .game-container {
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .game-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 1rem;
        }
        
        .ai-player-turn {
          margin-top: 1rem;
        }
        
        .ai-speech {
          font-style: italic;
          background-color: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        
        .players-voting-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }
        
        .player-vote-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .player-vote-item:hover {
          background-color: #f5f5f5;
        }
        
        .player-vote-item.selected {
          background-color: var(--primary-color);
          color: white;
        }
        
        .confirm-vote-button {
          margin-top: 1rem;
        }
        
        .survivors-list {
          list-style-type: none;
          margin: 1rem 0;
        }
        
        .survivors-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .game-info, .player-info, .instructions {
          margin-bottom: 2rem;
        }
        
        @media (max-width: 768px) {
          .game-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 