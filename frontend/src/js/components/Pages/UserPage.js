import React from "react";
import Auth from "../user_auth/Auth";
import UserDetail from "../user-detail/UserDetail"

export default class UserPage extends React.Component {
  render() {
    return (
      <Auth>
        <div>
          <UserDetail />
        </div>
      </Auth>
    );
  }
}