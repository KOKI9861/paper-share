export default function reducer(state={
    user: {
      username: 'test_user',
      token: 'test_token'
    },
    fetching: false,
    fetched: false,
    createError: null,
    loginError: null
  }, action) {

    switch (action.type) {
      case "LOGIN_USER_START": {
        return {...state, fetching: true};
      }
      case "LOGIN_USER_REJECTED": {
        return {...state, fetching: false, loginError: action.payload, createError: null,};
      }
      case "LOGIN_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: {
            username: action.username,
            token: action.token
          },
          loginError: null
        };
      }
      case "CREATE_USER_START": {
        return {...state, fetching: true};
      }
      case "CREATE_USER_REJECTED": {
        return {...state, fetching: false, createError: action.payload, loginError: null};
      }
      case "CREATE_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          user: {
            username: action.username,
          },
          createError: null
        };
      }
      case "LOGOUT": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          user: {
            username: "",
            token: ""
          }
        };
      }
      case "ERROR_RESET": {
        return {
          ...state,
          createError: null,
          loginError: null
        };
      }
    }

    return state;
}