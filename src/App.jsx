import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { Users, Gamepad2 } from 'lucide-react';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([
    { id: 'gomoku', name: '五子棋', icon: '♟️', players: '2', type: '实时联机', tag: 'HOT' },
    { id: 'pgsimulator', name: 'PG模拟器', icon: '🎰', players: '1', type: '单机休闲', tag: 'NEW' },
    { id: 'tictactoe', name: '井字棋', icon: '❌', players: '2', type: '好友对战', tag: 'NEW' },
    { id: '2048', name: '2048', icon: '🧩', players: '1', type: '单机休闲' },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      try {
        WebApp.ready();
        WebApp.expand();
        if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
          setUser(WebApp.initDataUnsafe.user);
        }
        if (WebApp.colorScheme === 'dark') {
          document.body.classList.add('tg-dark');
        }
      } catch (e) {
        console.warn("WebApp init failed", e);
      }
    } else {
      // Mock user for local development / browser
      setUser({
        first_name: 'Browser Player',
        username: 'web_user',
        id: 123456
      });
    }
  }, []);

  const handleGameClick = (game) => {
    if (game.id === 'pgsimulator') {
      // For PG Simulator, user wants to use this specific URL. 
      // We can redirect the window directly within the Telegram webview.
      window.location.href = "https://pglaohuji.com/";
    } else if (game.id === 'gomoku') {
      window.location.href = "/games/gomoku/index.html";
    } else {
      WebApp.showAlert(`即将进入游戏: ${game.name}！\n(游戏模块开发中...)`);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="user-info">
          <div className="avatar">
            {user?.first_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="greeting">
            <h1>Hi, {user?.first_name}!</h1>
            <p>准备好玩游戏了吗？</p>
          </div>
        </div>
        <Gamepad2 color="var(--accent-color)" size={32} />
      </header>

      <main>
        <h2 className="section-title">热门游戏</h2>
        <div className="games-grid">
          {games.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handleGameClick(game)}
            >
              {game.tag && <span className="badge">{game.tag}</span>}
              <div className="game-icon">{game.icon}</div>
              <div className="game-name">{game.name}</div>
              <div className="game-meta">
                <Users size={12} /> 
                {game.players} 人 | {game.type}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
