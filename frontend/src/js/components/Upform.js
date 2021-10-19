import React, { Component } from 'react';
import axios from "axios";
import Header from "./Header";
// import { Submit } from '../../actions/submitAction';
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Container, Row, Alert } from 'react-bootstrap';


// const click = () => {
    
//     dispatch(Submit(title,tag_id,text));
    
//   }

export default class UpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'',
            title:'',
            message:'Welcome',
            tag_id:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const user = useSelector((state) => state.userReducer.user);
        console.log(user.token)
        
        const config = {
            headers:{
              'Content-Type': "application/json"
            }
          };
        const data = {
            // tag_id: tag_id,
          };

        axios.get("http://localhost:8000/api/tag/", data, config)
        .then((response)=> {
            console.log(response.data);
            this.setState({
                //用到this,要用到this取向
                tag_id:JSON.parse(response.data).tags
            })
        }).catch(function (error) {
            console.log(error);//捕获异常数据
        })
    }
    
    


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            message:'投稿しました',
            text: '',
            title: '',
            tag_id:[]
        });
    }

    // フォームの値とstateをbindする役割
    handleChange = (e) => {
        this.setState({message:''});
        if(e.target.name =="title"){
            this.setState({title:e.target.value})
        }else if(e.target.name =="text"){
            this.setState({text:e.target.value})
        }
    }

    render() {
        return  (
            <div className="Submit">
                {/* <Container fluid="ture"> */}
                
                <form onSubmit={this.handleSubmit}>
                  <Header />
                  <p>{this.state.message}</p>
                  <label>タグを選んでください</label><br/>
                  <button variant="primary" type="button"> this.state.tag_id[0].name</button><button variant="primary" type="button"> tag2</button><br/>
                  <label>タイトル</label><br/>
                  <input type="text" name="title" value={this.state.title}  onChange={this.handleChange} /><br/>
                  <label>論文内容</label><br/>
                  <textarea name="text" value={this.state.text} onChange={this.handleChange}></textarea><br/>
                  
                  {/* <Button variant="primary" type="button" onClick={click}> 投稿する </Button> */}

                </form>
                {/* </Container> */}
            </div>
        );
    }

}