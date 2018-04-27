export const DO_CREATION = '@@user/DO_CREATION';
export const SUCCESS_CREATION = '@@session/SUCCESS_CREATION';
export const FAIL_CREATION = '@@session/FAIL_CREATION';

const initialState = {
  user: {
    email: '',
    password: '',
    id: undefined,
    token: undefined,
  },
  isFetching: false,
  error: {
    message: '',
  },
};

const doCreation = () => ({
  type: DO_CREATION,
});

const successCreation = payload => ({
  type: SUCCESS_CREATION,
  payload,
});

const failCreation = payload => ({
  type: FAIL_CREATION,
  payload,
});

// thunks (async action creator)
function rejectIfError(res) {
  if (res.error) {
    return Promise.reject(res.error.message);
  }

  return Promise.resolve(res);
}

export const createUser = body => dispatch => {
  dispatch(doCreation());

  return fetch('/signup', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => rejectIfError(res))
    .then(res => dispatch(successCreation(res)))
    .catch(message => dispatch(failCreation(message)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DO_CREATION:
      return {
        ...state,
        isFetching: true,
      };
    case SUCCESS_CREATION:
      return {
        ...state,
        isFetching: false,
        user: {
          ...action.payload.data,
          password: undefined,
        },
      };

    case FAIL_CREATION:
      return {
        user: {
          email: '',
          password: '',
          id: undefined,
          token: undefined,
        },
        isFetching: false,
        error: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
