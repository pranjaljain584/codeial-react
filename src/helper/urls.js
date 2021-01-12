const ROOT_API = `http://codeial.com:8000/api/v2`;

export const APIUrls = {
  login: () => `${ROOT_API}/users/login`,
  signup: () => `${ROOT_API}/users/signup`,
  fetchPosts: (page = 1, limit = 5) =>
    `${ROOT_API}/posts?page=${page}&limit=${limit}`,
};
