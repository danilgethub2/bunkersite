import React from 'react';

type CharacterProps = {
  character: {
    id?: number;
    name?: string;
    profession?: string;
    age?: number;
    gender?: string;
    health?: string;
    hobby?: string;
    phobia?: string;
    additionalInfo?: string;
    trait?: string;
  };
};

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  if (!character) {
    return <div className="character-card loading">Загрузка персонажа...</div>;
  }
  
  return (
    <div className="character-card">
      <div className="character-trait">
        <span className="label">Профессия:</span>
        <span className="value">{character.profession || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Возраст:</span>
        <span className="value">{character.age || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Пол:</span>
        <span className="value">{character.gender || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Здоровье:</span>
        <span className="value">{character.health || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Хобби:</span>
        <span className="value">{character.hobby || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Фобия:</span>
        <span className="value">{character.phobia || 'Неизвестно'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Дополнительная информация:</span>
        <span className="value">{character.additionalInfo || 'Нет'}</span>
      </div>
      
      <div className="character-trait">
        <span className="label">Черта характера:</span>
        <span className="value">{character.trait || 'Неизвестно'}</span>
      </div>
      
      <style jsx>{`
        .character-card {
          background-color: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .character-trait {
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #eee;
          padding-bottom: 0.5rem;
        }
        
        .label {
          font-weight: 600;
          color: var(--secondary-color);
        }
        
        .value {
          font-weight: 400;
        }
        
        .character-card.loading {
          text-align: center;
          padding: 2rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default CharacterCard; 