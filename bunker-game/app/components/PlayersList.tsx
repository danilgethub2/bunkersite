import React from 'react';

type Player = {
  id: number;
  name: string;
  character: {
    profession: string;
  };
  isEliminated: boolean;
};

type PlayersListProps = {
  players: Player[];
  currentPlayerId?: number;
  onPlayerClick?: (playerId: number) => void;
  showStatus?: boolean;
};

const PlayersList: React.FC<PlayersListProps> = ({ 
  players, 
  currentPlayerId, 
  onPlayerClick = () => {}, 
  showStatus = false 
}) => {
  return (
    <div className="players-list">
      <h3 className="subtitle">Игроки:</h3>
      
      <ul className="players">
        {players.map((player) => (
          <li 
            key={player.id}
            className={`player-item ${player.isEliminated ? 'eliminated' : ''} ${player.id === currentPlayerId ? 'current' : ''}`}
            onClick={() => onPlayerClick(player.id)}
          >
            <div className="player-name">{player.name}</div>
            {player.character && (
              <div className="player-role">{player.character.profession}</div>
            )}
            {showStatus && (
              <div className="player-status">
                {player.isEliminated ? 'Выбыл' : 'В игре'}
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        .players-list {
          margin-bottom: 1.5rem;
        }
        
        .players {
          list-style-type: none;
          padding: 0;
        }
        
        .player-item {
          padding: 0.75rem;
          border-bottom: 1px solid #eee;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          transition: background-color 0.2s;
        }
        
        .player-item:hover {
          background-color: #f9f9f9;
        }
        
        .player-name {
          font-weight: 600;
        }
        
        .player-role {
          font-size: 0.9rem;
          color: #666;
        }
        
        .player-status {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          border-radius: 4px;
          padding: 2px 6px;
        }
        
        .player-item.current {
          background-color: #f0f7ff;
          border-left: 3px solid var(--primary-color);
        }
        
        .player-item.eliminated {
          opacity: 0.5;
        }
        
        .player-item.eliminated .player-status {
          background-color: #ffeeee;
          color: #cc0000;
        }
        
        .player-item:not(.eliminated) .player-status {
          background-color: #eeffee;
          color: #00aa00;
        }
      `}</style>
    </div>
  );
};

export default PlayersList; 