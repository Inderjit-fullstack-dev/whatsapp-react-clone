import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import "./Login.css";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt=""
        />

        <div className="login__text">
          <h1>Welcome to WhatsApp Clone</h1>
        </div>

        <button className="login__btn" onClick={handleLogin}>
          Sign in with Google
        </button>

        <footer className="login__footer">Developed by Inderjit</footer>
      </div>
    </div>
  );
};

export default Login;
