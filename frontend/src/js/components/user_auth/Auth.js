import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

function Auth ({children}) {
  const userFetched = useSelector((state) => state.userReducer.fetched);
  if (!userFetched) {
    return (
      <div>
        <h3>ログインしてください</h3>
        <Button 
          variant="contained" color="primary" component={Link}
          to="/login">
          ログイン
        </Button>
      </div>
    )
  } else {
    return children
  }
};

export default Auth;