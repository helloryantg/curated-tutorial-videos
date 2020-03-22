// React
import React from 'react'
// Styles
import './CustomButton.scss'

function CustomButton(props) {
  const {
    text,
    onClick
  } = props

  return (
    <div className="CustomButton">
      <button
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div> 
  )
}

export default CustomButton