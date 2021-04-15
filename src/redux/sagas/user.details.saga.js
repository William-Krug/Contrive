import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserDetailsById(action) {
  // Fetches the other user details by id
  // Incoming payload should be id -> Integer
  try {
    const response = yield axios.get(`/api/user/details/${action.payload}`);
    yield put({
      type: 'SET_OTHER_USER_DETAILS',
      payload: response.data,
    });
  } catch (err) {
    console.error('an error occurred fetching user details by id');
  }
}

function* fetchLoggedInUserDetails() {
  try {
  } catch (err) {
    console.error('an error occurred fetching logged-in user details');
  }
}

function* userDetailsSaga() {
  yield takeLatest('FETCH_USER_DETAILS_BY_ID', fetchUserDetailsById);
  yield takeLatest('FETCH_LOGGED_IN_USER_DETAILS', fetchLoggedInUserDetails);
}

export default userDetailsSaga;
