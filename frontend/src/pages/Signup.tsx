import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup.tsx';
import './Forms.css';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstName, lastName, username);
  }

  return (
    <div className='form-container'>
      <div className="form-left-side"></div>
      <div className="form-right-side">
        <div className="form">
          <h2>Create an account</h2>
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
            <label>First name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName} />
            <label>Last name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName} />
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username} />
            <button disabled={isLoading}>Create a profile</button>
          </form>
          <p className="form-redirect">Already have an account ? <Link to="/login"> Sign in</Link></p>
          {error && <div>{error}</div>}

        </div>

      </div>
    </div>
  )
};

export default Signup;
