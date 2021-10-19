import React,{Component} from "react";
import { ListGroup, Badge, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

class Articlelist extends Component{
    render() {
        const { id, title, author, tags, date } = this.props;
        return(
                <ListGroup>
                    <Link to={"/article?id="+id}>
                        <ListGroup.Item action>
                            <div className="article-title"><h2>{ title }</h2></div>
                            <div className="article-tag">
                                    {tags.map((tag, idx) => {
                                        return(
                                            <Badge>
                                                <span class="badge text-light bg-primary" key="idx" bg="primary">{ tag.tag_name }</span>
                                            </Badge>
                                        )
                                    })}
                            </div>
                            <Row>
                                <Col xs="1">
                                    投稿者:<span>{ author }</span>
                                </Col>
                                <Col md="10">
                                    <em>{ date }</em>に投稿しました。
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Link>
                </ListGroup>
        );
    }
}

export default Articlelist;