import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const global = useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        username,
        password
      });
      global.setUser(response.data.user); 
      global.setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Username or password incorrect');
      }
    }
  };

  return (
    <LoginFormStyled onSubmit={handleLogin}>
      <h1>Login</h1>
      {error && <p className='error'>{error}</p>}
      <div className="input-control">
        <input 
          type="text" 
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="input-control">
        <input 
          type="password" 
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div className="submit-btn">
        <button type="submit">Login</button>
      </div>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 75vh;
  padding: 2rem;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #fff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  max-width: 500px;

  h1 {
    font-size: 3rem;
    color: rgba(34, 34, 96, 1);
    margin-bottom: 1rem;
  }

  .input-control {
    width: 100%;
    input {
      width: 100%;
      padding: 1rem;
      font-size: 1.2rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
    }
  }

  .submit-btn {
    button {
      padding: 0.8rem 1.6rem;
      font-size: 1.2rem;
      border-radius: 30px;
      border: none;
      background: var(--color-accent);
      color: #fff;
      cursor: pointer;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      transition: background 0.4s ease-in-out;
      &:hover {
        background: var(--color-green);
      }
    }
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  p {
    margin-top: 1rem;
    a {
      color: var(--color-accent);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
