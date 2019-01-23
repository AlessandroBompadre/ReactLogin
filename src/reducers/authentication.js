const authentication = (state = [], action) => {
    switch (action.type) {
      case 'NEW_USER':
        return [
          ...state,
          {
            username: action.username,
            password: action.password,
            logged: false
          }
        ]
      case 'LOG_IN':
        return state.map(
          user =>
          user.username === action.username ? { ...user, logged: true } : user
        )
      case 'LOG_OUT':
        return state.map(
          user =>
          user.username === action.username ? { ...user, logged: false } : user
        )  
      case 'USER_STATE':
      return state.map(
        user => { return user.logged }
      )
      default:
        return state
    }
  }
  
  export default authentication