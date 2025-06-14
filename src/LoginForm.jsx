import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username || !password) {
      setError('Uh Oh! A Username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.uuid) {
        setError('');
        onLogin(data.uuid); 
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Login Now :3</button>
      </form>
    </div>
  );
};

export default LoginForm;

