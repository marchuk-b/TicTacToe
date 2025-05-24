import React from 'react'
import './Box.css'

export const Box = ({value, onClick, isWinning }) => {
	const style = `box ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''} ${isWinning ? 'winning' : ''}`;

	return (
    <button className={style} onClick={onClick}>{value}</button>
  )
}
