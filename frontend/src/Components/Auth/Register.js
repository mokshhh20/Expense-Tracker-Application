import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{6,30}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!&*]).{8,15}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setNameError('');
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');
    setIsLoading(true);

    if (!validateName(name)) {
      setNameError('Name must contain only characters and spaces');
      setIsLoading(false);
      return;
    }

    if (!validateUsername(username)) {
      setUsernameError('Username must be 6-30 characters long and include only letters and numbers');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be 8-15 characters long, include at least one digit, one lowercase letter, one uppercase letter, and one special character');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/register', {
        name,
        username,
        password
      });
      setRedirectToLogin(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError('User already exists');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <RegisterFormStyled onSubmit={handleRegister}>
      <h1>Welcome to Expense Tracker</h1>
      <h2>Register</h2>
      {nameError && <p className='error'>{nameError}</p>}
      {usernameError && <p className='error'>{usernameError}</p>}
      {passwordError && <p className='error'>{passwordError}</p>}
      {generalError && <p className='error'>{generalError}</p>}
      <div className="input-control">
        <input 
          type="text" 
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)} 
          disabled={isLoading}
        />
      </div>
      <div className="input-control">
        <input 
          type="text" 
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} 
          disabled={isLoading}
        />
      </div>
      <div className="input-control">
        <input 
          type="password" 
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} 
          disabled={isLoading}
        />
      </div>
      <div className="submit-btn">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      <p>Already a user? <a href="/login">Click here to login</a></p>
    </RegisterFormStyled>
  );
}

const RegisterFormStyled = styled.form`
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

export default Register;
