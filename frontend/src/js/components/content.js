import React, { Component, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Auth from "./user_auth/Auth";

function Content(){


    const [text,Settext] =useState("222");
    const [title,Settitle] =useState("111");
    const [tag,Settag] =useState([{tag_id:1,tag_name: 'GAN'}]);
    const [name,Setname]=useState({user_id:1, username:'ota'});
    const [time,Settime] =useState(1);
    const [docomment,Setdocomment] = useState("");


    const[ctotal,Setctotal]=useState({message:"", comments:[]});
    // const [comment,Setcomment] = useState("");
    // const [cid,Setcid] = useState(1);
    // const [cname,Setcname]=useState({user_id:1, username:'ota'});
    // const [ctime,Setctime]=useState(1);

    const user = useSelector((state) => state.userReducer.user);
    console.log(user.token)
    console.log(user.username)

    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    const [id,Setid] = useState((query2.get('id')));

    // const [id,Setid] = useState(1);
    const config = {
        headers:{
            'Content-Type': "application/json"
        }
        };
    const data = {
        };
    const data2 = {
        };
  
    useEffect(() => {
        const options = {
            params:{
                article_id: id,
            }
        }
        axios.get("http://localhost:8000/api/article/", options)
        .then((response)=> {
            console.log((JSON.parse(response.data)));
            Settag((JSON.parse(response.data)).articles[0].tags);
            Settitle((JSON.parse(response.data)).articles[0].title);
            Settext((JSON.parse(response.data)).articles[0].text);
            Settime((JSON.parse(response.data)).articles[0].posted_time);
            Setname((JSON.parse(response.data)).articles[0].user);
            // Setid(JSON.parse(response.data).id)
        }).catch(function (error) {
            console.log(error);//捕获异常数据
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:8000/api/comment/"+id+'/', data2, config)
        .then((response)=> {
            console.log(JSON.parse(response.data).comments);
            Setctotal(JSON.parse(response.data))
            // Setcomment(JSON.parse(response.data2).text);
            // Setcid(JSON.parse(response.data2).id);
            // Setcname(JSON.parse(response.data2).user.username);
            // Setctime(JSON.parse(response.data2).posted_time);
        }).catch(function (error) {
            console.log(error);//捕获异常数据
        })
    }, [])

    const click = (docomment) => {
        return function() {
            if (user.token == 'test_token'){
                return(
        alert('コメントするにはまずログインしてください'))}
            else{
        console.log("11")
        const config = {
            headers:{
                'Content-Type': "application/json",
                'Authorization' : "JWT "+user.token
            }};
        const datapost = {
            text: docomment
        };
        axios.post("http://localhost:8000/api/comment/"+id+"/", datapost, config)
        .then((response) => {console.log("post:"+response.data)})
        .catch(function (error) {
            console.log(error.response)
          });
        }}
    };

    return(
        <Container>
            <h1>Welcome</h1>
            <Form.Group controlId="content">
                <Form.Label><b>投稿者:</b></Form.Label>
                <span>
                    {name.username}<br/>
                </span> 
                <Form.Label> <b>投稿時間:</b></Form.Label>
                <span>
                    {new Date(time*1000).toLocaleString()}<br/>
                </span>
                <Form.Label><b>論文タグ:</b></Form.Label>
                <span>
                    {tag.map((ta, idx) => {
                                return(ta.tag_name+"　"
                                )}
                    )}
                </span> 
            </Form.Group>


            <Form.Group controlId="title">
                <Form.Label><b>タイトル</b></Form.Label><br/>
                <span>
                    {title}
                </span>
            </Form.Group>

            <Form.Group controlId="text">
                <Form.Label><b>論文内容</b></Form.Label><br/>

                    <span>
                        {text}<br/>
                    </span>
      
                
            </Form.Group>

            <Form.Group controlId="comment">
                <Form.Label><b>コメント一覧</b></Form.Label><br/>
                
                    {
                    ctotal.comments.map((te,idx)=>{
                        return(
                            <Container>
                                ユーザー:{te.user.username}<br/>{te.text}<br/>コメント時間：{new Date(te.posted_time*1000).toLocaleString()}<br/>
                            </Container>
                        )
                    }
                    )
                    } 
            </Form.Group>
            
            
                <Form.Group controlId="docomment">
                    <Form.Label><b>コメント欄</b></Form.Label>
                    {/* <Auth> */}
                    <Form.Control
                    as="textarea" rows ={5}
                    onChange={(e) => { Setdocomment(e.target.value) }}
                    value={docomment}
                    />
                    {/* </Auth> */}
                </Form.Group>
            
            <Button variant="danger" type="button" onClick={click(docomment)}> コメントする </Button>
        </Container>
    )
}
export default Content;