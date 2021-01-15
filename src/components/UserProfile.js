import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/userProfile';

class UserProfile extends Component {
  componentDidMount() {
      const {match} = this.props ;
      if(match.params.id){
        // dispatch an action
        this.props.dispatch(fetchUserProfile(match.params.id)) ;
      }
  }
  render() {

    const {userProfile} = this.props ;
    // console.log('userProfile' , userProfile) ;
    const user = userProfile.user ;

    if(userProfile.inProgress){
        return <h1>Loading</h1>
    }

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
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile : state.userProfile ,
  };
}

export default connect(mapStateToProps)(UserProfile);
