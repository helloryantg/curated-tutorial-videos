// React
import React from 'react'
// Styles
import './Input.scss'
// Utils
import stringUtils from '../../utils/string.utils'

function Input(props) {
  const { 
    option,
    placeholder = '',
    value,
    onChange,
    error
  } = props

  return (
    <div className="Input">
      <label>{stringUtils.camelCaseToTitleCase(option)}</label>
      <input
        type={['password', 'confirmPassword'].includes(option) ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => onChange(target)}
      />
      {error ? <div className="error">{error}</div> : null}
    </div>
  )
}

export default Input