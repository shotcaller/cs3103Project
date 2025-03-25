import React, { useState } from "react";
import "./loginStyle.css";
import "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // WIP - going to add
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  return (

    // HEADERS
    <div className="wrapper" style={{ height: "500px" }}>
      <div className="form-header">
        <div className="titles">
          <div className={`title-login ${isLogin ? "active" : ""}`}>Login</div>
          <div className={`title-register ${!isLogin ? "active" : ""}`}>Register</div>
        </div>
      </div>

      {isLogin ? (

        // LOGIN
        <form className="login-form" autoComplete="off">

          <div className="input-box">
            <input type="text" className="input-field" required />
            <label className="label">Email</label>
            <i className='bx bx-envelope icon'></i>
          </div>
          
          <div className="input-box">
            <input type="password" className="input-field" required />
            <label className="label">Password</label>
            <i className='bx bx-lock-alt icon'></i>
          </div>

          <div className="input-box">
            <button type="button" className="btn-submit">Sign In <i className='bx bx-log-in'></i></button>
          </div>

          <div className="switch-form">
            <span>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></span>
          </div>

        </form>
      ) : (

        //REGISTER
        <form className="register-form" autoComplete="off">

          <div className="input-box">
            <input type="text" className="input-field" required />
            <label className="label">Username</label>
            <i className='bx bx-user icon'></i>
          </div>

          <div className="input-box">
            <input type="text" className="input-field" required />
            <label className="label">Email</label>
            <i className='bx bx-envelope icon'></i>
          </div>

          <div className="input-box">
            <input type="password" className="input-field" required />
            <label className="label">Password</label>
            <i className='bx bx-lock-alt icon'></i>
          </div>

          <div className="input-box">
            <button type="button" className="btn-submit">Sign Up <i className='bx bx-user-plus'></i></button>
          </div>

          <div className="switch-form">
            <span>Already have an account? <a href="#" onClick={toggleForm}>Login</a></span>
          </div>

        </form>
      )}
    </div>
  );
};

export default AuthForm;