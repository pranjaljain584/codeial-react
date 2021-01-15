import React, { Component } from 'react';
import { FriendList, PostsList } from './';

class Home extends Component {
  render() {
    const { posts , friends , isLoggedIn } = this.props;
    console.log('props' , this.props)
    return (
      <div className="home">

        <PostsList posts={posts} />
        {isLoggedIn && <FriendList friends={friends} /> }
      </div>
    );
  }
}

export default Home;
