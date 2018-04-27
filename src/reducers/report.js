export const FETCH_REPORTS = '@@report/FECTH_REPORTS';
export const RECEIVE_REPORTS = '@@report/RECEIVE_REPORTS';
export const FAIL_REPORTS = '@@report/FAIL_REPORTS';

const loadReports = () => ({
  type: FETCH_REPORTS,
});

const setReports = payload => ({
  type: RECEIVE_REPORTS,
  payload,
});

const failReports = payload => ({
  type: FAIL_REPORTS,
  payload,
});

export const fetchReports = () => dispatch => {
  dispatch(loadReports());

  return fetch('/api/reports')
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        return Promise.reject(res.error.message);
      }
      console.log(res);
      dispatch(setReports(res));
    })
    .catch(err => dispatch(failReports(String(err))));
};

const initialState = {
  reports: [],
  isFetching: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_REPORTS:
      console.log([...action.payload.data.reports]);
      return {
        ...state,
        reports: [...action.payload.data.reports],
        isFetching: false,
      };
    case FAIL_REPORTS:
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
