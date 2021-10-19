import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from '../../actions/userAction';

function List1 () {
  const dispatch = useDispatch();
  const history = useHistory();
  const click = () => {
    dispatch(LogoutUser());
    history.push('/logout');
  }
  return (
    <Container className="center">Hello Login app list1<br/>
      <Button onClick={click}>
        ログアウト
      </Button>
    </Container>
  );
  
}
export default List1