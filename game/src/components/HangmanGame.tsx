import React, { useState, useEffect } from 'react';
import '../styles/HangmanGame.css';
import Scoreboard from './Scoreboard';
import { ComputerScienceWords } from '../themes/ComputerScience';
import { MeteorologyWords } from '../themes/Meteorology';
import { OceanologyWords } from '../themes/Oceanology';
import { AstronomyWords } from '../themes/Astronomy';

interface HangmanGameProps {
  players: string[];
  theme: string;
}

interface WordEntry {
  word: string;
  definition: string;
}


const HangmanGame: React.FC<HangmanGameProps> = ({ players, theme }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState(''); // State for definition
  const [guessedLetters, setGuessedLetters] = useState(new Set<string>());
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(new Array(players.length).fill(6));
  const [gameOver, setGameOver] = useState(false);
  const [revealWord, setRevealWord] = useState(false);

  useEffect(() => {
    selectNewWord();
  }, [theme, currentPlayerIndex]);

  const selectNewWord = () => {
    let wordList: WordEntry[]; // Declare the variable with the correct type
  
    if (theme === 'ComputerScience') {
      wordList = ComputerScienceWords;
    } else if (theme === 'Meteorology') {
      wordList = MeteorologyWords;
    } else if (theme === 'Astronomy') {
      wordList = AstronomyWords;
    } else {
      wordList = OceanologyWords;
    }
  
    const selected = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(selected.word.toUpperCase());
    setCurrentDefinition(selected.definition);
  };

  const hangmanParts = [
    <circle cx="70" cy="30" r="10" />, // Head
    <line x1="70" y1="40" x2="70" y2="70" />, // Torso
    <line x1="70" y1="50" x2="60" y2="60" />, // Left Arm
    <line x1="70" y1="50" x2="80" y2="60" />, // Right Arm
    <line x1="70" y1="70" x2="60" y2="80" />, // Left Leg
    <line x1="70" y1="70" x2="80" y2="80" />  // Right Leg
  ];

  const moveToNextPlayer = () => {
    setRevealWord(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGameOver(true);
    }
    setRemainingAttempts(6);
    setGuessedLetters(new Set<string>());
    selectNewWord();
  };

  const guessLetter = (letter: string) => {
    const updatedGuessedLetters = new Set(guessedLetters.add(letter));
    setGuessedLetters(updatedGuessedLetters);
  
    if (!currentWord.includes(letter)) {
      const newScores = [...scores];
      if (newScores[currentPlayerIndex] > 0) {
        newScores[currentPlayerIndex] -= 1;
      }
      setScores(newScores);
      setRemainingAttempts(attempts => attempts - 1);
  
      if (newScores[currentPlayerIndex] <= 0) {
        setRevealWord(true);
      }
    }
  
    checkGameState(updatedGuessedLetters);
  };

  const checkGameState = (updatedGuessedLetters: Set<string>) => {
    const isWordGuessed = currentWord.split(' ').every(word => 
      word.split('').every(letter => updatedGuessedLetters.has(letter) || letter === ' ')
    );
    
    if (isWordGuessed) {
      const newScores = [...scores];
      newScores[currentPlayerIndex] = remainingAttempts;
      setScores(newScores);
      setRevealWord(true);

      if (currentPlayerIndex === players.length - 1) {
        setGameOver(true);
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      }
    } else if (remainingAttempts <= 0) {
      setRevealWord(true);
      if (currentPlayerIndex === players.length - 1) {
        setGameOver(true);
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      }
    }
  };

  if (revealWord) {
    return (
      <div>
        <p>The word was: {currentWord}</p>
        <p>Definition: {currentDefinition}</p>
        <button onClick={moveToNextPlayer}>Next Player</button>
      </div>
    );
  }  

  const isLetterGuessed = (letter: string) => {
    return guessedLetters.has(letter);
  };

  const renderedWord = currentWord.split(' ').map(word => 
    word.split('').map(letter => 
      isLetterGuessed(letter) ? letter : '_'
    ).join(' ')
  ).join('\n');

  const currentPlayer = players[currentPlayerIndex];

  if (gameOver) {
    return <Scoreboard players={players} scores={scores} />;
  }

  return (
    <div className="hangman-game">
      <h1>Hangman</h1>
      <p className="current-theme">Current Theme: {theme}</p>
      <svg width="140" height="100" className="hangman-drawing">
        {hangmanParts.slice(0, 6 - remainingAttempts)}
      </svg>
      <div className="word" style={{ whiteSpace: 'pre-line' }}>
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
