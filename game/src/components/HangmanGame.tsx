import React, { useState, useEffect } from 'react';
import '../styles/HangmanGame.css';
import Scoreboard from './Scoreboard';
import { ComputerScienceWords } from '../themes/ComputerScience';
import { MeteorologyWords } from '../themes/Meteorology';
import { OceanologyWords } from '../themes/Oceanology';

interface HangmanGameProps {
  players: string[];
  theme: string;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ players, theme }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set<string>());
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(new Array(players.length).fill(6));
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const wordList = theme === 'ComputerScience' ? ComputerScienceWords
                  : theme === 'Meteorology' ? MeteorologyWords
                  : OceanologyWords;
    const word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    setCurrentWord(word);
    setGuessedLetters(new Set<string>());
    setRemainingAttempts(6);
  }, [theme, currentPlayerIndex]);

  const hangmanParts = [
    <circle cx="70" cy="30" r="10" />, // Head
    <line x1="70" y1="40" x2="70" y2="70" />, // Torso
    <line x1="70" y1="50" x2="60" y2="60" />, // Left Arm
    <line x1="70" y1="50" x2="80" y2="60" />, // Right Arm
    <line x1="70" y1="70" x2="60" y2="80" />, // Left Leg
    <line x1="70" y1="70" x2="80" y2="80" />  // Right Leg
  ];

  const guessLetter = (letter: string) => {
    const updatedGuessedLetters = new Set(guessedLetters.add(letter));
    setGuessedLetters(updatedGuessedLetters);
  
    if (!currentWord.includes(letter)) {
      const newScores = [...scores];
      // Decrement score only if it's greater than 0
      if (newScores[currentPlayerIndex] > 0) {
        newScores[currentPlayerIndex] -= 1;
      }
      setScores(newScores);
      setRemainingAttempts(remainingAttempts - 1);
    }
  
    checkGameState(updatedGuessedLetters);
  };

  const checkGameState = (updatedGuessedLetters: Set<string>) => {
    const isWordGuessed = currentWord.split('').every(letter => updatedGuessedLetters.has(letter));
    if (isWordGuessed || remainingAttempts <= 0) {
      if (currentPlayerIndex === players.length - 1) {
        // All players have played, game over
        setGameOver(true);
      } else {
        // Move to the next player
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      }
    }
  };

  const isLetterGuessed = (letter: string) => {
    return guessedLetters.has(letter);
  };

  const renderedWord = currentWord.split('').map(letter => 
    isLetterGuessed(letter) ? letter : '_'
  ).join(' ');

  const currentPlayer = players[currentPlayerIndex];

  if (gameOver) {
    return <Scoreboard players={players} scores={scores}  />;
  }

  return (
    <div className="hangman-game">
      <h1>Hangman</h1>
      <svg width="140" height="100" className="hangman-drawing">
        {hangmanParts.slice(0, 6 - remainingAttempts)}
      </svg>
      <div className="word">
        <p>{renderedWord}</p>
      </div>
      <div className="alphabet">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button 
            key={letter} 
            onClick={() => guessLetter(letter)} 
            disabled={isLetterGuessed(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="player-info">
        <p>{currentPlayer}</p>
        <p>Score: {scores[currentPlayerIndex]}</p>
      </div>
    </div>
  );
}

export default HangmanGame;
