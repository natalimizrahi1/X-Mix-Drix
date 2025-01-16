import { FC, useState } from 'react';
import styles from './XMixDrix.module.css'; // Adjust the path as necessary
import XIcon from './XIcon'; // Adjust the path as necessary
import OIcon from './OIcon'; // Adjust the path as necessary

type Player = boolean | null; // true for X, false for O, null for empty
type Board = Player[];
type WinningLine = number[] | null;

const XMixDrix: FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);

  const calculateWinner = (squares: Board): Player | 'draw' => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(lines[i]);
        return squares[a];
      }
    }
    return squares.every(square => square !== null) ? 'draw' : null;
  };

  const handleClick = (index: number): void => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext;
    setBoard(newBoard);
   
    const winner = calculateWinner(newBoard);
    if (winner !== null) {
      setGameOver(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinningLine(null);
  };

  const getStatus = (): string => {
    const winner = calculateWinner(board);
    if (winner === 'draw') return "It's a Draw!";
    if (winner !== null) return `Player ${winner ? 'X' : 'O'} Wins!`;
    return `Player ${isXNext ? 'X' : 'O'}'s Turn`;
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameBoard}>
        <div className={styles.gameStatus}>
          {getStatus()}
        </div>
       
        <div className={styles.boardGrid}>
          {board.map((cell, index) => (
            <button
              key={index}
              className={`${styles.cell} ${winningLine?.includes(index) ? styles.winningCell : ''}`}
              onClick={() => handleClick(index)}
              disabled={cell !== null || gameOver}
            >
              {cell !== null && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {cell ? <XIcon /> : <OIcon />}
                </div>
              )}
            </button>
          ))}
        </div>

        <button onClick={resetGame} className={styles.newGameButton}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default XMixDrix ;
