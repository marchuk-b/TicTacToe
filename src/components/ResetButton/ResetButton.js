import React from 'react'
import './ResetButton.css'

export const ResetButton = ({onClick, textInner}) => {
  return (
    <button className='reset-btn' onClick={onClick}>{textInner}</button>
  )
}