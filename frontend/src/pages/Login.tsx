import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin.tsx'
import './Forms.css';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password)
  }

  return (
    <div className="form-container">
      <div className="form-left-side"></div>
      <div className="form-right-side">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email} />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password} />
            <button disabled={isLoading}>Login</button>
          </form>
          <p className="form-redirect">You don't have an account ? <Link to="/signup"> Sign up</Link></p>
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>

  )
};

export default Login;
