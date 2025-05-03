import React from 'react';

type CatastropheProps = {
  catastrophe: {
    type?: string;
    description?: string;
    consequences?: string;
    duration?: string;
  };
};

const CatastropheInfo: React.FC<CatastropheProps> = ({ catastrophe }) => {
  if (!catastrophe) {
    return <div className="catastrophe-info loading">Загрузка информации о катастрофе...</div>;
  }
  
  return (
    <div className="catastrophe-info">
      <h3 className="subtitle">Информация о катастрофе:</h3>
      
      <div className="catastrophe-trait">
        <span className="label">Тип катастрофы:</span>
        <span className="value">{catastrophe.type || 'Неизвестно'}</span>
      </div>
      
      <div className="catastrophe-trait">
        <span className="label">Описание:</span>
        <span className="value">{catastrophe.description || 'Неизвестно'}</span>
      </div>
      
      <div className="catastrophe-trait">
        <span className="label">Последствия:</span>
        <span className="value">{catastrophe.consequences || 'Неизвестно'}</span>
      </div>
      
      <div className="catastrophe-trait">
        <span className="label">Продолжительность:</span>
        <span className="value">{catastrophe.duration || 'Неизвестно'}</span>
      </div>
      
      <style jsx>{`
        .catastrophe-info {
          margin-bottom: 1.5rem;
        }
        
        .catastrophe-trait {
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
          text-align: right;
          flex: 1;
          margin-left: 1rem;
        }
        
        .catastrophe-info.loading {
          text-align: center;
          padding: 1rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default CatastropheInfo; 