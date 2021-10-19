import React, { useEffect  } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch　} from "react-redux";
import { Redirect } from 'react-router-dom';

import { Button } from "@material-ui/core";
import Auth from './Auth';

function Logout () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: "LOGOUT"});
  });
  return (
    <Redirect to="/"/>
  );
}

export default Logout;