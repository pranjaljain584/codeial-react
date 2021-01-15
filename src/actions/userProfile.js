import { APIUrls } from '../helper/urls';
import { getAuthTokenFromLocalStorage } from '../helper/utils';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESSFUL,
} from './actionTypes';

export function userProfileSuccessful(user) {
  return {
    type: USER_PROFILE_SUCCESSFUL,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());

    const url = APIUrls.userProfile(userId);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA', data);
        if (data.success) {
          dispatch(userProfileSuccessful(data.data.user));
          return;
        }
        dispatch(userProfileFailure(data.message));
      });
  };
}
