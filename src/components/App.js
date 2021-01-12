import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404 } from './';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />

            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
