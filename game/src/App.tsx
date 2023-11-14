// App.tsx
import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import HangmanGame from './components/HangmanGame';
import { Player } from './types';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<{
    players: Player[];
    theme: string;
  } | null>(null);

  const handleStart = (players: Player[], theme: string) => {
    setGameState({ players, theme });
  };

  const handleGameEnd = (players: Player[]) => {
    // Sort players by score in descending order
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    // Display the scoreboard
    alert(`Game Over! Scoreboard:\n${sortedPlayers.map(player => `${player.name}: ${player.score}`).join('\n')}`);
    // Reset the game state
    setGameState(null);
  };

  return (
    <div>
      {!gameState ? (
        <MainMenu onStart={handleStart} />
      ) : (
        <HangmanGame players={gameState.players} theme={gameState.theme} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
};

export default App;
