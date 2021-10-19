import React, { Component } from "react";
import Articlelist from "./Articlelist";
import PageButton from "./PageButton";
import Header from "../header/header";
import { Container } from "react-bootstrap";

class Articleoverview extends Component{
    constructor(props){
        super(props);
        this.pageNext=this.pageNext.bind(this);
        this.setPage=this.setPage.bind(this);
        this.state = {
            Article:[
                {
                    warning:"サーバーからデータを取得できませんでした。",
                    id: 0,
                    user:{ user_id: 0,username: "NULL" },
                    tags: [],
                    text: "",
                    posted_time: 0,
                }
            ],
            display_articles: [],
            current: 1, //今表示しているページ
            pageSize:5, //毎ページ表示できる項目
            goValue:0,  //指定のページにジャンプ
            totalPage:0,//総ページ数
            offset:0
        }
    }
    //サーバーから記事のデータを取得
    componentDidMount(){
        let t = this;
        fetch("http://localhost:8000/api/article", {method: 'GET'})
        .then(
            function (res) {
                console.log(res);
                res.json().then(function (data) {
                        console.log(JSON.parse(data).articles);
                        t.setState({
                            Article:JSON.parse(data).articles
                        });
                    }
                )
            },
            this.pageCount()
        );
    };
    pageCount(){
        this.setState({
            totalPage:Math.ceil(this.state.Article.length/this.state.pageSize)
        })
    }

    //ページ表示
    componentDidUpdate(){
        if(this.state.totalPage !== Math.ceil(this.state.Article.length/this.state.pageSize)){
            this.setState({
                totalPage:Math.ceil(this.state.Article.length/this.state.pageSize)
            })
            this.pageNext(this.state.goValue)
        }
    }

    //ページ分け
    setPage(num){
        this.setState({
            display_articles:this.state.Article.slice(num,num+this.state.pageSize)
        })
    }
    pageNext (num) {
        console.log(this.state.Article.length)
        this.setPage(num)
    }

    //frontに記事データを返す
    render(){
        return(
            <div>
                <Header />
                <Container fluid>
                    {this.state.display_articles.map((item,list) =>(
                        <div key={list}>
                        <Articlelist
                            id = {item.id}
                            title = {item.title}
                            tags = {item.tags}
                            author = {item.user.username}
                            date = {new Date(item.posted_time*1000).toLocaleString()}
                        />
                    </div>
                    ))}
                    <PageButton { ...this.state } pageNext={this.pageNext} />
                </Container>
            </div>
        );
    }
}

export default Articleoverview;