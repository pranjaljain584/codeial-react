const ROOT_API = `http://codeial.com:8000/api/v2`;

export const APIUrls = {
  login: () => `${ROOT_API}/users/login`,
  signup: () => `${ROOT_API}/users/signup`,
  editProfile: () => `${ROOT_API}/users/edit`,
  userProfile: (userId) => `${ROOT_API}/users/${userId}`,
  fetchPosts: (page = 1, limit = 5) =>
    `${ROOT_API}/posts?page=${page}&limit=${limit}`,
  userFriends: () => `${ROOT_API}/friendship/fetch_user_friends`,
};
