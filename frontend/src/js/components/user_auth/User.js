import axios from 'axios';

class User {

    isLoggedIn = () => this.get('isLoggedIn') === 'true';
  
    set = (key, value) => localStorage.setItem(key, value);
  
    get = key => this.getLocalStorage(key);
  
    getLocalStorage = key => {
      const ret = localStorage.getItem(key);
      if (ret) {
        return ret;
      }
      return null;
    };

    regist = async (email, password) => {
      const config = {
        headers:{
          'Content-Type': "application/json"
        }
      };
      const data = {
        username: email,
        password: password
      };

      axios.post("http://localhost:8000/api/signup/", data, config)
      .then((response) => {
        // 返ってきたJsonを見てユーザー作成の可否判断
        if (response.status === 201){
          return true;
        }else{
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
    };
  
    login = async (email, password) => {
      const config = {
        headers:{
          'Content-Type': "application/json"
        }
      };
      const data = {
        username: email,
        password: password
      };

      axios.post("http://localhost:8000/api/login/", data, config)
      .then((response) => {
        // 返ってきたJsonを見てログインの可否を判断
        console.log(response)
        if (response.status === 200){
          this.set('isLoggedIn', true);
          return true;
        }else{
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
    };
  
    logout = async () => {
      if (this.isLoggedIn()) {
        this.set('isLoggedIn', false);
  
        // ログアウト処理
        //　他に必要な処理があるのならこちら
  
      }
    };
  }
  
  export default new User();