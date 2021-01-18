import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/userProfile';
import { APIUrls } from '../helper/urls';
import { getAuthTokenFromLocalStorage } from '../helper/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.id));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.id !== currentParams.id
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.id));
    }
  }

  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.id;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.id;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfuly',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: false,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const userId = this.props.match.params.id;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed Friend Successfuly',
      });
      // console.log("DATA" , data) ;
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: false,
        error: data.message,
      });
    }
  };

  render() {
    const { userProfile } = this.props;
    const { error, success, successMessage } = this.state;

    const user = userProfile.user;

    if (userProfile.inProgress) {
      return <h1>Loading</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>

          <div className="field-value">{user.name}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}

          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert error-dailog">{error} </div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
