export const newUsers = (username, password) => ({
  type: 'NEW_USER',
  password: password,
  username: username
})

export const logIn = username => ({
  type: 'LOG_IN',
  username
})

export const logOut = username => ({
  type: 'LOG_OUT',
  username
})