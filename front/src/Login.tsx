import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";


interface LoginProps {
  onSubmit: (user: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = () => {
    axios.post("http://localhost:3000/api/user/login", {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res);
      if (res.data.userId) {
        sessionStorage.setItem('userId', res.data.userId);
        navigate(`/userpage/${res.data.userId}`);
        }else{
        navigate(`/login`);
      }
    }).catch((error) => {
      console.log(error);
    });


    // navigate(`/userpage/${user}`);
      ///userpage/$(user)に遷移するページを作成
      // Navigate({to: "/userpage/$(user)"});


  };

  return (
    <form>
      <h1>ログイン</h1>
      <label>
        eメール
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        パスワード
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button type="button" size="large" onClick={handleLogin}>ログイン</Button>
    </form>
  );
};

export default Login;
