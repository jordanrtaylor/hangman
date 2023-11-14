// HangmanGame.tsx
import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import computerScienceWords from '../Themes/ComputerScience'; // Static import for demonstration
import '../HangmanGame.css';

interface HangmanGameProps {
  players: Player[];
  theme: string;
  onGameEnd: (players: Player[]) => void;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ players, theme, onGameEnd }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(new Set<string>());
  const [gameOver, setGameOver] = useState(false);

  // Select a random word from the theme's word list
  const selectRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  };

  // State to track the current word to guess
  const [currentWord, setCurrentWord] = useState(selectRandomWord(computerScienceWords));

  useEffect(() => {
    // Reset the current word when the theme changes
    setCurrentWord(selectRandomWord(computerScienceWords));
  }, [theme]);
  // Function to handle letter guesses
  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return;

    setGuessedLetters(new Set([...guessedLetters, letter]));

    // Check if the letter is in the word
    if (!currentWord.includes(letter)) {
      // Incorrect guess, decrement the player's score
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].score -= 1;
      if (newPlayers[currentPlayerIndex].score <= 0) {
        // Move to the next player or end the game
        if (currentPlayerIndex + 1 < players.length) {
          setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {
          setGameOver(true);
          onGameEnd(newPlayers);
        }
      }
    } else {
      // Correct guess, update the game state if necessary
      // For example, check if the player has won
    }
  };

  // Function to start a new round or reset the game
  const resetGame = () => {
    setCurrentPlayerIndex(0);
    setGuessedLetters(new Set<string>());
    setGameOver(false);
    // You can also choose a new word and reset scores if needed
  };

  // Placeholder for the game's UI
  return (
    <div className="HangmanGame">
      {gameOver ? (
        <div className="gameOver">
          <p>Game Over</p>
          <button onClick={resetGame}>Start New Game</button>
        </div>
      ) : (
        <div>
          <div className="currentPlayer">
            <p>Current Player: {players[currentPlayerIndex].name}</p>
            <p>Score: {players[currentPlayerIndex].score}</p>
          </div>
          <div className="word">
            {currentWord.split('').map((letter, index) => (
              <span key={index} className="letter">
                {guessedLetters.has(letter) ? letter : '_'}
              </span>
            ))}
          </div>
          <div>
            {/* Render buttons or inputs for letter guesses */}
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <button key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.has(letter)}>
                {guessedLetters.has(letter) ? '□' : letter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
