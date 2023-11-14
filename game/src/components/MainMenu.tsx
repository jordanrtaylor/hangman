// MainMenu.tsx
import React, { useState } from 'react';
import { Player } from '../types';

interface MainMenuProps {
  onStart: (players: Player[], theme: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(2); // Default to 2 players
  const [theme, setTheme] = useState(''); // Theme can be empty initially
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    // Reset player names array with empty strings for each player
    setPlayerNames(Array(count).fill(''));
  };

  const handlePlayerNameChange = (name: string, index: number) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handleSubmit = () => {
    // Create player objects with names and initial score
    const players: Player[] = playerNames.map(name => ({ name, score: 6 }));
    onStart(players, theme);
  };

  return (
    <div>
      <h1>Welcome to Hangman!</h1>
      <div>
        <label>Number of Players:</label>
        <input
          type="number"
          value={playerCount}
          onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Theme:</label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>
      {Array.from({ length: playerCount }, (_, index) => (
        <div key={index}>
          <label>Player {index + 1} Name:</label>
          <input
            type="text"
            value={playerNames[index]}
            onChange={(e) => handlePlayerNameChange(e.target.value, index)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
};

export default MainMenu;
