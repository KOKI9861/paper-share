import axios from "axios";

export function paperSubmit(title,text,tags){
    return function(dispatch) {
    dispatch({type: ""});
    const config = {
        headers:{
            'Content-Type': "application/json",
            'Authorization' : "JWT {TOKEN}"
        }
    };
    const data = {
        title: title,
        tags:[],
        text: text
    };
      axios.post("http://localhost:8000/api/article/", data, config)
      .then((response) => {
        // dispatch({title: title,tag_id:tag_id,text:text})
      })
      .catch(function (error) {
        console.log(error)
      });
    };
  }