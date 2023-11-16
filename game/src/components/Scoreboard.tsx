import React from 'react';
import '../styles/Scoreboard.css';

interface ScoreboardProps {
  players: string[];
  scores: number[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, scores }) => {
  // Combine players and scores into a single array and sort by scores
  const playerScores = players.map((player, index) => ({ name: player, score: scores[index] }));
  playerScores.sort((a, b) => b.score - a.score); // Sort in descending order of scores

  const onContinue = () => {
    // Redirect to homepage or reload the page
    window.location.href = '/';
  };

    return (
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <ul>
          {playerScores.map((player, index) => (
            <li key={index}>{player.name}: {player.score}</li>
          ))}
        </ul>
          <button onClick={onContinue}>Continue</button>
        </div>
    );
  };
  
  export default Scoreboard;