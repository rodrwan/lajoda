export const FETCH_PILLS = '@@pill/FECTH_PILLS';
export const RECEIVE_PILLS = '@@pill/RECEIVE_PILLS';
export const FAIL_PILLS = '@@pill/FAIL_PILLS';

const loadPills = () => ({
  type: FETCH_PILLS,
});

const setPills = payload => ({
  type: RECEIVE_PILLS,
  payload,
});

const failPills = payload => ({
  type: FAIL_PILLS,
  payload,
});

export const fetchPills = () => dispatch => {
  dispatch(loadPills());

  return fetch('/api/pills')
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res.error.message);
      }

      return dispatch(setPills(res));
    })
    .catch(err => dispatch(failPills(err)));
};

const initialState = {
  pills: [],
  isFetching: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PILLS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PILLS:
      return {
        ...state,
        pills: [...action.payload.data.pills],
        isFetching: false,
      };
    case FAIL_PILLS:
      return {
        ...state,
        error: {
          ...action.payload.error,
        },
        isFetching: false,
      };
    default:
      return state;
  }
};
