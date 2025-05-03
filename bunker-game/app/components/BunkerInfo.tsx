import React from 'react';

type BunkerProps = {
  bunker: {
    size?: string;
    supplies?: string;
    equipment?: string;
    duration?: string;
    condition?: string;
  };
};

const BunkerInfo: React.FC<BunkerProps> = ({ bunker }) => {
  if (!bunker) {
    return <div className="bunker-info loading">Загрузка информации о бункере...</div>;
  }
  
  return (
    <div className="bunker-info">
      <h3 className="subtitle">Информация о бункере:</h3>
      
      <div className="bunker-trait">
        <span className="label">Размер:</span>
        <span className="value">{bunker.size || 'Неизвестно'}</span>
      </div>
      
      <div className="bunker-trait">
        <span className="label">Припасы:</span>
        <span className="value">{bunker.supplies || 'Неизвестно'}</span>
      </div>
      
      <div className="bunker-trait">
        <span className="label">Оборудование:</span>
        <span className="value">{bunker.equipment || 'Неизвестно'}</span>
      </div>
      
      <div className="bunker-trait">
        <span className="label">Длительность:</span>
        <span className="value">{bunker.duration || 'Неизвестно'}</span>
      </div>
      
      <div className="bunker-trait">
        <span className="label">Состояние:</span>
        <span className="value">{bunker.condition || 'Неизвестно'}</span>
      </div>
      
      <style jsx>{`
        .bunker-info {
          margin-bottom: 1.5rem;
        }
        
        .bunker-trait {
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
        
        .bunker-info.loading {
          text-align: center;
          padding: 1rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default BunkerInfo; 