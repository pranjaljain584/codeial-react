import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_COMMENT_LIKE,
  UPDATE_POSTS,
  UPDATE_POST_LIKE,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];

    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;

    case UPDATE_POST_LIKE:
      console.log("this.state in update likes" , state) ;
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatedPosts;

      case UPDATE_COMMENT_LIKE:
        console.log("this.state in update COMMENT LIKES" , state) ;
        const updatedCommentArr = state.map((comment) => {
          if (comment._id === action.commentId) {
            return {
              ...comment,
              likes: [...comment.likes, action.userId],
            };
          }
          return comment;
        });
        return updatedCommentArr;

    default:
      return state;
  }
}
