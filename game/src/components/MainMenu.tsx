import { useState } from 'react';
import '../styles/MainMenu.css';

const MainMenu = ({ onStartGame }: { onStartGame: (players: string[], theme: string) => void }) => {
  const [playerName, setPlayerName] = useState('');
  const [theme, setTheme] = useState('');
  const [players, setPlayers] = useState<string[]>([]);

  const handleAddPlayer = () => {
    setPlayers([...players, playerName]);
    setPlayerName(''); // Reset the input after adding a player
  };

  const handleStartGame = () => {
    if (players.length > 0 && theme) {
      onStartGame(players, theme);
    } else {
      alert("Please add at least one player and select a theme.");
    }
  };

  return (
    <div className="main-menu">
      <h1>Hangman Game</h1>
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Player Name"
        />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <div>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="">Select Theme</option>
          <option value="ComputerScience">Computer Science</option>
          <option value="Meteorology">Meteorology</option>
          <option value="Oceanology">Oceanology</option>
          <option value="Astronomy">Astronomy</option>
        </select>
      </div>
      <div>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
      <div>
        <h2>Players</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainMenu;
