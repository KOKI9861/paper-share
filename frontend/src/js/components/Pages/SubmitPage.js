import React from "react";
import Auth from "../user_auth/Auth";
import Submit from "../Submit";

export default class SubmitPage extends React.Component {
  render() {
    return (
      <Auth>
        <div>
          <Submit />
        </div>
      </Auth>
    );
  }
}