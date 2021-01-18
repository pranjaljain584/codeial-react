import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import userProfile from './userProfile';
import friends from './friends';
import search from './search';

export default combineReducers({
  posts,
  auth,
  userProfile,
  friends,
  search,
});
