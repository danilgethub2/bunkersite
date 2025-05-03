import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Страница не найдена</h1>
        <p className="description">
          Извините, запрашиваемая страница не существует.
        </p>
        <div className="actions">
          <Link href="/">
            <button className="start-button">Вернуться на главную</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 