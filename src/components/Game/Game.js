import React, { useEffect, useState } from 'react'
import './Game.css'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { Board } from '../Board/Board';
import { ResetButton } from '../ResetButton/ResetButton';
import { MessageBox } from '../MessageBox/MessageBox';

export const Game = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [winningCells, setWinningCells] = useState([]);

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  useEffect(() => {
    const fetchScore = () => {
      const storedScores = JSON.parse(localStorage.getItem('Tic-Tac-Toe Scores'));

      if (storedScores) {
        setScores(storedScores);
      } else {
        setScores({ xScore: 0, oScore: 0 });
      }
    }

    fetchScore();
  }, [])

  const handleBoxClick = (boxIndex) => {
    if (gameOver) return;
    const updatedBoard = board.map((value, index) => {
      if(index === boxIndex) {
        return xPlaying === true ? 'X' : 'O';
      } else {
        return value;
      }
    })

    const winner = checkWinner(updatedBoard);
    if (winner === 'O') {
      let {oScore} = scores;
      oScore += 1;

      const updatedScores = {...scores, oScore};

      setScores(updatedScores);
      setMessage("O is winner");
      setModalIsOpen(true);

      localStorage.setItem('Tic-Tac-Toe Scores', JSON.stringify(updatedScores))
    } else if(winner === 'X') {
      let {xScore} = scores;
      xScore += 1;
      const updatedScores = {...scores, xScore};

      setScores(updatedScores);
      setMessage("X is winner")
      setModalIsOpen(true)
      
      localStorage.setItem('Tic-Tac-Toe Scores', JSON.stringify(updatedScores))
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        setWinningCells([x, y, z]);
        return board[x];
      }
    }

    if (!board.includes(null)) {
      setGameOver(true);
      setMessage("Draw"); 
      setModalIsOpen(true);
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setWinningCells([]);
    setBoard(Array(9).fill(null));
  }

  const resetScoreBoard = () => {
    const startScores = { xScore: 0, oScore: 0 }
    setScores(startScores)

    localStorage.setItem('Tic-Tac-Toe Scores', JSON.stringify(startScores))
  }

  return (
    <div className='game'>
      <ScoreBoard scores={scores} xPlaying={xPlaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} winningCells={winningCells}/>

      <div className='btns'>
        <ResetButton onClick={resetBoard} textInner='Reset'/>
        {(scores.xScore !== 0 || scores.oScore !== 0) && 
          <ResetButton onClick={resetScoreBoard} textInner='Reset score'/>
        }
      </div>

      <MessageBox message={message} modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)}/>
    </div>
  )
}
