import React, { Component, useEffect, useState } from 'react';
import axios from "axios";
import Header from "./Header";
// import { paperSubmit } from '../actions/submitAction';
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Container, Row, Alert } from 'react-bootstrap';


function Submit(){
    const [text,Settext] =useState("");
    const [title,Settitle] =useState("");
    const [tag_id,Settag_id] =useState([{id:0, name:"smith"}]);
    const [message,Setmessage]=useState('Welcome')
    const [tag,Settag] =useState([1]);

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    const user = useSelector((state) => state.userReducer.user);
    console.log(user.token)
    console.log(user.username)
    const config = {
        headers:{
            'Content-Type': "application/json"
        }
        };
    const data = {
        // tag_id: tag_id,
        };

    useEffect(() => {
        axios.get("http://localhost:8000/api/tag/", data, config)
        .then((response)=> {
            console.log(JSON.parse(response.data).tags);
            console.log(tag_id)
            Settag_id(JSON.parse(response.data).tags)
        }).catch(function (error) {
            console.log(error);//捕获异常数据
        })
    }, [])
    

    const click = (text,title,tag_ids) => {
        return function() {
        const config = {
            headers:{
                'Content-Type': "application/json",
                'Authorization' : "JWT "+user.token
            }};
        const datapost = {
            title: title,
            tag_ids:tag_ids,
            text: text
        }
        axios.post("http://localhost:8000/api/article/", datapost, config)
        .then((response) => {Setmessage("投稿しました")})
        .catch(function (error) {
            console.log(error.response)
          });
        }
    };

    return  (
        <div className="Submit">

            <Form>

                <Header />
                <p>{message}</p>
                    <Form.Group controlId="title">
                        <Form.Label>タグを選んでください</Form.Label>
                        {
                            tag_id.map((tag, idx) => {
                                return(
                                    <Button variant="primary" type="button" id={tag.id} onClick={()=>Settag([tag.id])} > {tag.name} </Button>
                                    
                                )
                            })
                        }
                        
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>タイトル</Form.Label>
                        <Form.Control
                        type="title"
                        placeholder="タイトルを入力してください"
                        onChange={(e) => { Settitle(e.target.value) }}
                        value={title}
                        />
                    </Form.Group>
                    <Form.Group controlId="text">
                        <Form.Label>論文内容</Form.Label>
                        <Form.Control
                        as="textarea" rows ={5}
                        placeholder="論文内容を入力してください"
                        onChange={(e) => { Settext(e.target.value) }}
                        value={text}
                        />
                    </Form.Group>

                
                <Button variant="danger" type="button" onClick={click(text,title,tag)}> 投稿する </Button>

            </Form>
            {/* </Container> */}
        </div>
    );
}
export default Submit;