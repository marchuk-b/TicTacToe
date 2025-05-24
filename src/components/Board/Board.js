import React from 'react'
import { Box } from '../Box/Box'
import './Board.css'

export const Board = ({board, onClick, winningCells}) => {
  return (
    <div className='board'>
        {board.map((value, index) => {
           return <Box 
                    key={index} 
                    value={value} 
                    onClick={() => value === null && onClick(index)} 
                    isWinning={winningCells.includes(index)}  
                  />
        })}
    </div>
  )
}
