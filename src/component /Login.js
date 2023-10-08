import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login({ setIslogin, isLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const defineuser = "sntuser";
  const definepassword = "snt@1234";
  const passwordRejex = /[a-zA-Z]+[@#$%^&*]?[0-9]+/;
  const navigation = useNavigate();
  const loginHandel = (e) => {
    e.preventDefault();
    if (password && user) {
      console.log(password);
      console.log(definepassword);
      if (password.match(passwordRejex) && password.length > 7) {
        if (password === definepassword) {
          if (user == defineuser) {
            setIslogin(true);
            let obj = {
              username: user,
              password: password,
            };
            const local = JSON.stringify(obj);
            localStorage.setItem("item", local);
            setPassword("");
            setUser("");
            alert("login sucessfull");
            navigation("/list");
          } else {
            alert(" enter 'sntuser' as a username");
          }
        } else {
          alert("enter  'snt@1234' as a password");
        }
      } else {
        alert("Password is not in proper formet");
      }
    } else {
      alert("fill");
    }
  };
  const paginationpage =()=>{
    navigation("/list")
  }
  return (
    <form>
      {isLogin ? (
        <div>
          <p>
            user allready login go to pagination page <span className="click" onClick={()=>paginationpage()}>clickme</span>
          </p>
        </div>
      ) : (
        <div className="form">
          <span>username :</span>
          <input
            type="text"
            placeholder="enter username "
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <span>password :</span>
          <input
            type="password"
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="password"
          />
          <button onClick={(e) => loginHandel(e)}>Login</button>
        </div>
      )}
    </form>
  );
}

export default Login;
