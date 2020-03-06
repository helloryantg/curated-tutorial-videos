const setToken = token => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

const getToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      token = null
    }
  }
  return token
}

const removeToken = () => localStorage.removeItem('token')

const getUserFromToken = () => {
  const token = getToken()
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken
}