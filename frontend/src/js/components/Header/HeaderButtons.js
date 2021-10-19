import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

export default class HeaderButtons extends React.Component {
  render() {
    return (
      <Container fluid>
        <Navbar variant="light" bg="light">
          <Container fluid>
            <NavbarBrand>記事投稿回覧システム</NavbarBrand>
            <Nav className="me-auto">
              <Button variant="light" component={Link} to="/">
                トップ
              </Button>
              <Button variant="light" component={Link} to="/newlinedelete">
                改行削除
              </Button>
              <Button variant="light" component={Link} to="/login">
                ログイン/新規登録
              </Button>
              <Button variant="light" component={Link} to="/user">
                ユーザー
              </Button>
              <Button variant="light" component={Link} to="/submit">
                投稿
              </Button>
              <Button variant="light" component={Link} to="/logout">
                ログアウト
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </Container>
    );
  }
}