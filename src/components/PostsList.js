import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CreatePost , Post} from './';

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    console.log("POST" , posts) ;
    return (
      
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
    posts : PropTypes.array.isRequired ,
}

export default PostsList;
