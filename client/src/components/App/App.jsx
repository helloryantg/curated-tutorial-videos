import React, { useState, useEffect } from 'react'
import './App.scss'
import { signup } from '../../services/user.service'

function App() {
  const [user, setUser] = useState({})

  const signupUser = user => {
    
  }

  useEffect(() => {
    const user = {
      firstName: 'Stephen',
      lastName: 'Gonzales',
      displayName: 'sgonzales',
      email: 'sgonzales@gmail.com',
      password: 'stephen'
    }

    signup(user)
  }, [])

  return (
    <div className="App">

    </div>
  )
}

export default App
