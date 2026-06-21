export default function handler(req, res) {
  res.status(200).json([
    { id: 'gomoku', name: '五子棋', icon: '♟️', players: '2', type: '实时联机', tag: 'HOT' },
    { id: 'tictactoe', name: '井字棋', icon: '❌', players: '2', type: '好友对战', tag: 'NEW' },
    { id: '2048', name: '2048', icon: '🧩', players: '1', type: '单机休闲' }
  ]);
}
