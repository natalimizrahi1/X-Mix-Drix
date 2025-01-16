import { FC, useState } from "react";
import { XIcon, OIcon } from "./Icons";
import styles from "./XMixDrix.module.css";

type Player = boolean | null;
type Board = Player[];
type WinningLine = number[] | null;

const XMixDrix: FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);

  const calculateWinner = (squares: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(lines[i]);
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return "draw";
    }

    return null;
  };

  const handleClick = (index: number): void => {
    if (board[index] || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = isXNext;
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result !== null) {
      setWinner(result);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const getStatus = (): string => {
    if (winner === "draw") {
      return "Game Over - It's a Draw!";
    }
    if (winner !== null) {
      return `Game Over - Player ${winner ? "X" : "O"} Wins!`;
    }
    return `Current Turn: Player ${isXNext ? "X" : "O"}`;
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameBoard}>
        <div className={`${styles.gameStatus} ${winner !== null ? styles.winnerStatus : ""}`}>{getStatus()}</div>

        <div className={styles.boardGrid}>
          {board.map((cell, index) => (
            <button key={index} className={`${styles.cell} ${winningLine?.includes(index) ? styles.winningCell : ""}`} onClick={() => handleClick(index)} disabled={cell !== null || winner !== null}>
              {cell !== null && <div style={{ position: "absolute", inset: 0 }}>{cell ? <XIcon /> : <OIcon />}</div>}
            </button>
          ))}
        </div>

        <button onClick={resetGame} className={`${styles.newGameButton} ${winner !== null ? styles.gameOverButton : ""}`}>
          {winner !== null ? "Play Again" : "Reset Game"}
        </button>
      </div>
    </div>
  );
};

export default XMixDrix;
