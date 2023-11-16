import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import HangmanGame from './components/HangmanGame';
import { Theme } from './types'; // Import the Theme type if needed

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [theme, setTheme] = useState<string>('');

  const handleStartGame = (playersInput: string[], themeInput: string) => {
    setPlayers(playersInput);
    setTheme(themeInput);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
    setTheme('');
  };

  return (
    <div className="App">
      {gameStarted ? (
        <HangmanGame
          players={players}
          theme={theme}
        />
      ) : (
        <MainMenu onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;