export const DO_LOGIN = '@@session/DO_LOGIN';
export const OK_LOGIN = '@@session/OK_LOGIN';
export const FAIL_LOGIN = '@@session/FAIL_LOGIN';

const initialState = {
  user: {
    token: '',
    email: '',
    id: '',
  },
  isAuthenticated: false,
  error: {
    message: '',
  },
  isFetching: false,
};

// action creators
const doLogin = () => ({
  type: DO_LOGIN,
});

const okLogin = payload => ({
  type: OK_LOGIN,
  payload,
});

const failLogin = payload => ({
  type: FAIL_LOGIN,
  payload,
});

export const refreshSession = payload => { 

  return {
    type: OK_LOGIN,
    payload,
  }
};

// asyn action creators (thunks)
export const login = body => dispatch => {
  dispatch(doLogin());

  return fetch('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res.error.message);
      }

      return dispatch(okLogin(res));
    })
    .catch(message => dispatch(failLogin(String(message))));
};

export const DO_LOGOUT = '@@session/DO_LOGOUT';
export const OK_LOGOUT = '@@session/OK_LOGOUT';

const doLogout = () => ({
  type: DO_LOGOUT,
});

const okLogout = () => ({
  type: OK_LOGOUT,
});

export const logout = () => dispatch => {
  dispatch(doLogout);
  setTimeout(() => dispatch(okLogout()), 2 * 1000);
};

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case OK_LOGIN:
      localStorage.setItem('user', JSON.stringify(action.payload.data));

      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...action.payload.data.user,
          logged: true,
        },
      };
    case FAIL_LOGIN:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: {
          message: action.payload,
        },
      };
    case DO_LOGOUT:
      return {
        ...state,
        isFetching: true,
      };
    case OK_LOGOUT:
      localStorage.removeItem('user');

      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: {
          email: '',
          token: '',
          id: '',
          logged: false,
        },
        error: {},
      };
    default:
      return state;
  }
};
