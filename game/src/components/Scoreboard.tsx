import React from 'react';
import '../styles/Scoreboard.css';

interface ScoreboardProps {
  players: string[];
  scores: number[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, scores }) => {
  const onContinue = () => {
    // Redirect to homepage or reload the page
    window.location.href = '/';
  };

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}: {scores[index]}</li>
        ))}
      </ul>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}

export default Scoreboard;
