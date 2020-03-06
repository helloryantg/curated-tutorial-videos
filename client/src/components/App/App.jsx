import React, { useState, useEffect } from 'react'
import './App.scss'
import { signup } from '../../services/user.service'
import tokenService from '../../services/token.service'
import userService from '../../services/user.service'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  const getUserFromLocalStorage = () => {
    setUser(userService.getUser())
  }

  // const login = () => {
  //   const user = userService.getUser()

  //   if (user) {
  //     setUser(user)
  //   }
    
  //   console.log(userService.getUser())

  //   userService.login({
  //     email: 'test@email.com',
  //     password: 'test-user-1'
  //   })
  // }

  // const getUser = () => {
  //   const user = userService.getUser()
  // }

  console.log(user)

  return (
    <div className="App">

    </div>
  )
}

export default App
