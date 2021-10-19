import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import HeaderButtons from "./Header/HeaderButtons";
import HomePage from "./Pages/HomePage";
import NewlinedeletePage from "./Pages/NewlinedeletePage";
import SubmitPage from "./Pages/SubmitPage";
import UserPage from "./Pages/UserPage";
import Login from "./user_auth/Login";
import Logout from "./user_auth/Logout";
import content from "./content";


export default class DefaulPage extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <HeaderButtons /><hr/>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/newlinedelete' component={NewlinedeletePage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/user' component={UserPage}/>
            <Route exact path='/submit' component={SubmitPage}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/article' component={content}/>
          </div>
        </Router>
      </div>
    );
  }
}