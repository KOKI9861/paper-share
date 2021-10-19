import React, { Component, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { LoginUser, CreateUser } from '../../actions/userAction';


function Login () {
  const [registUser, setRegistUser] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const isRegist = (registUser ? '新規登録' : 'ログイン');
  const ReverseisRegist = (registUser ? 'ログイン' : '新規登録');

  const dispatch = useDispatch();
  const history = useHistory();
  const cError = useSelector((state) => state.userReducer.createError);
  const lError = useSelector((state) => state.userReducer.loginError);
  let message = "";
  
  if(cError !== null){
    message = "既に使われているユーザー名です";
  }
  if(lError !== null){
    message = "ユーザー名かパスワードが異なります";
  }
  const	registUserChange = () =>{
    setRegistUser(() => !registUser);
    dispatch({type: "ERROR_RESET"})
    message = "";
    setUsername("");
    setPassword("");
  };

  const click = () => {
    if(registUser){
      dispatch(CreateUser(username, password, history));
    }else{
      dispatch(LoginUser(username, password, history))
    }
  }
  
  return (
    <Container className="center">
      <Row className="justify-content-md-center">
        <Form>
          <p>
            <b>
              {isRegist}<br/>
            </b>
            <Button variant="primary" type="button" onClick={registUserChange}>
              {ReverseisRegist}はこちら
            </Button>
          </p>
          <Form.Group controlId="email">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control
              type="email"
              placeholder="メールアドレスを入力してください"
              onChange={(e) => { setUsername(e.target.value) }}
              value={username}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>パスワード</Form.Label>
            <Form.Control
              type="password"
              placeholder="パスワードを入力してください"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
            />
          </Form.Group>
          <p>
            {message}
          </p>
          <Button variant="primary" type="button" onClick={click}>
            {isRegist}
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;